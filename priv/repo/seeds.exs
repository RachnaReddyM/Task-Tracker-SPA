# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Tasktracker.Repo.insert!(%Tasktracker.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

defmodule Seeds do
  alias Tasktracker.Repo
  alias Tasktracker.Users.User
  alias Tasktracker.Tasks.Task

  def run do
    p = Comeonin.Argon2.hashpwsalt("password1")

    Repo.delete_all(User)
    a = Repo.insert!(%User{ name: "alice", email: "alice@gmail.com", password_hash: p })
    b = Repo.insert!(%User{ name: "bob", email: "bob@bob.com", password_hash: p })
    c = Repo.insert!(%User{ name: "carol", email: "carol@gmail.com", password_hash: p })
    d = Repo.insert!(%User{ name: "dave", email: "dave@gmail.com", password_hash: p })

    Repo.delete_all(Task)
    Repo.insert!(%Task{ user_id: d.id, title: "task1_backend", description: "desc of task1_backend", time_taken: 15, completed: false, assignee: a.name })

    Repo.insert!(%Task{ user_id: d.id, title: "task2_backend", description: "desc of task2_backend", time_taken: 15, completed: false, assignee: c.name })
    
  end
end

Seeds.run
