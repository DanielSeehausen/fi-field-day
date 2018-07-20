defmodule Server.Plug.VerifyRequest do

  defmodule IncompleteRequestError do
    @moduledoc """
    Error raised on bad request (checks for validity with header + body json)
    """
    defexception plug_status: 400, message: "Bad Request!"

    def exception(value) do
      msg = "did not get what was expected, got: #{value}"
      %IncompleteRequestError{message: msg}
    end

  end

  def init(options), do: options

  def call(%Plug.Conn{request_path: path} = conn, opts) do
    IO.puts "Verifying!"
    if path in opts[:paths], do: verify_request!(conn, opts[:required_headers])
    IO.puts "WE MADE IT FUK"
    conn
  end

  defp validate_headers(found_headers, required_headers) do
    unless Enum.all?(required_headers, &(&1 in found_headers)) do
      raise IncompleteRequestError, "Headers - #{IO.inspect found_headers}"
    end
  end

  defp validate_client_token(token) do
    # TODO these should be set on limits of group ids/pulling from set, not hard coded
    unless token > 0 and token < 100 do
       raise IncompleteRequestError, "Token - #{token}"
     end
  end

  defp validate_payload(json) do
    IO.inspect json
    # raise IncompleteRequestError, "JSON - #{json}"
  end

  defp verify_request!(conn, required_headers) do
    headers = Enum.into(conn.req_headers, %{})

    validate_headers(Map.keys(headers), required_headers)

    headers["client-token"]
      |> String.to_integer
      |> validate_client_token

    validate_payload(conn.body_params)

  end



end
