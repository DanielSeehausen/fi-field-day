require 'redis'
require 'rest-client'
require 'json'

class MatrixManager
	def initialize(id)
		@redis = Redis.new(port: 6379)
		@server_url = "http://mayisgr8.win"
		@id = id
		@last_write = false
	end

	def initialize_blank(size=1000)
		 self.set_rect({x:0, y:0}, {x: size-1,y: size-1}, "000")
	end

	def read(argument)
		if argument.class == Array
			coordinates = self.many_coordinates(argument)
			colors = @redis.mget(*coordinates)

			argument.map.with_index do |point, i|
				{x: point[:x], y: point[:y], color: colors[i]}
			end
		elsif argument.class == Hash
			coordinate = self.to_coordinate(argument)
			color = @redis.get(coordinate)

			{x: argument[:x], y: argument[:y], color: color}
		end
	end


	def read_rect(start_point, end_point)
		self.read(self.create_rect(start_point, end_point))
	end

	def set_rect(start_point, end_point, color, local=false)
		data = self.create_rect(start_point, end_point)
		
		if local
			self.local_set(data)
		else 
			self.set(data, color)
		end
	end

	def set(argument, color)

		if (@last_write && !(Time.now - @last_write >= 0.3)
			return
		end

		if argument.class == Array
			argument.each do |point|
				self.send(point[:x], point[:y], point[:color] || color)
				@last_write = Time.now
				sleep(0.31)
			end
		elsif argument.class == Hash
			self.send(argument[:x], argument[:y], argument[:color] || color)
			@last_write = Time.now
		end

	end

	def local_set(argument)
		if argument.class == Array
			coordinates = self.many_coordinates(argument, true)
			coordinates.each do |coord|
				@redis.set(coord[:coordinate], coord[:color])
			end
		elsif argument.class == Hash
			coordinate = self.to_coordinate(argument)
			@redis.set(coordinate, argument[:color])
		end
	end

	def send(x,y,color)
		puts ("Sending #{color} to coordinates (#{x},#{y})!")
		begin 
			RestClient.post(@server_url + "/setTile?x=#{x}&y=#{y}&c=#{color}&id=#{@id}", {})
		rescue 
			send(x,y,color)
		end
	end

	def create_rect(start_point, end_point, color=nil)
		points = []
		if end_point[:x] > start_point[:x] && end_point[:y] > start_point[:y]
				(start_point[:x]..end_point[:x]).each do |x|
					(start_point[:y]..end_point[:y]).each do |y|
						if color
							points << {x: x, y: y, color: color}
						else
							points << {x: x, y: y}
						end
					end
				end
		end

		points
	end

	def many_coordinates(array_hash, set=false)
		array_hash.map do |hash|
			coordinate = self.to_coordinate(hash)

			if set
				{coordinate: coordinate, color: hash[:color]}
			else
				coordinate
			end
		end
	end

	def to_coordinate(hash)
		"#{hash[:x]}-#{hash[:y]}"
	end

end


