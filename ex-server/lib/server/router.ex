defmodule Server.Router do
  use Plug.Router

  alias Server.Plug.VerifyRequest

  # plug(
  #   Plug.Parsers,
  #   parsers: [:urlencoded, :multipart, :json],
  #   json_decoder: Poison
  # )

  plug(
    VerifyRequest,
    required_headers: ["content-type", "client-token"],
    paths: ["/setTile"]
  )

  plug(:match)
  plug(:dispatch)

  get("/", do: send_resp(conn, 200, "index response"))
  get("/board", do: send_resp(conn, 200, "board response"))
  get("/tile", do: send_resp(conn, 200, "tile response"))
  post("/setTile", do: send_resp(conn, 201, "SET A TILE!"))

  match(_, do: send_resp(conn, 404, "Oops!"))
end
