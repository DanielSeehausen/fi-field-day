defmodule Server.MixProject do
  use Mix.Project

  def project do
    [
      app: :server,
      version: "0.1.0",
      elixir: "~> 1.6",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  defp applications(:dev) do
    [:remix]
  end

  def application do
    [
      extra_applications: [:logger],
      mod: {Server, []},
      env: [cowboy_port: 8080],
      dev_applications: applications(:dev)
    ]
  end

  defp deps do
    [
      {:cowboy, "~> 1.1.2"},
      {:plug, "~> 1.3.4"},
      {:poison, "~> 3.1"},
      {:remix, "~> 0.0.1", only: :dev}
    ]
  end

end
