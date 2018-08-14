require 'rest-client'
require 'json'

class MatrixManager
	attr_reader :api_url

	def initialize(id)
  	@id = id
    @api_url = "http://localhost:3000"
	end

	def set_tile(hash)
		# Tested, working
		set_tile_url = "#{self.api_url}/set-tile"
		response = RestClient.post(set_tile_url, hash)
		JSON.parse(response)
	end


	def clear_queue
		# Tested, working
		delete_queue_url = "#{self.api_url}/clear-queue"
		response = RestClient.delete(delete_queue_url)
		JSON.parse(response)
	end


	def get_queue
		# Tested, working
		get_queue_url = "#{self.api_url}/get-queue"
		response = RestClient.get(get_queue_url)
		JSON.parse(response)
	end


	def get_rect(start_hash, end_hash)
		# End point not live yet
		get_rect_queue_url = "#{self.api_url}/get-rect?x1=#{start_hash[:x]}&y1=#{start_hash[:y]}&x2=#{end_hash[:x]}&y2=#{end_hash[:y]}"
		response = RestClient.get(get_rect_queue_url)
		JSON.parse(response)
	end


	def get_tile(hash)
		# Tested, working
		get_tile_url = "#{self.api_url}/get-tile?x=#{hash[:x]}&y=#{hash[:y]}"
		response = RestClient.get(get_tile_url)
		JSON.parse(response)
	end




end
