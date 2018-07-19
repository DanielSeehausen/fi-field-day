# Testing a Plug
# Testing Plugs is pretty straightforward thanks to Plug.Test. It includes a number of convenience functions to make testing easy.
#
# Write the following test to test/example/router_test.exs:
#
# defmodule Server.RouterTest do
#   use ExUnit.Case
#   use Plug.Test
#
#   alias Server.Router
#
#   @content "<html><body>Hi!</body></html>"
#   @mimetype "text/html"
#
#   @opts Router.init([])
#
#   test "returns welcome" do
#     conn =
#       conn(:get, "/", "")
#       |> Router.call(@opts)
#
#     assert conn.state == :sent
#     assert conn.status == 200
#   end
#
#   test "returns uploaded" do
#     conn =
#       conn(:post, "/upload", "content=#{@content}&mimetype=#{@mimetype}")
#       |> put_req_header("content-type", "application/x-www-form-urlencoded")
#       |> Router.call(@opts)
#
#     assert conn.state == :sent
#     assert conn.status == 201
#   end
#
#   test "returns 404" do
#     conn =
#       conn(:get, "/missing", "")
#       |> Router.call(@opts)
#
#     assert conn.state == :sent
#     assert conn.status == 404
#   end
# end
# Run it with this:
#
# $ mix test test/example/router_test.exs
