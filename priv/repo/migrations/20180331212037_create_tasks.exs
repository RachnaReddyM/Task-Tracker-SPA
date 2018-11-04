defmodule Tasktracker.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :assignee, :string, null: false
      add :title, :string, null: false
      add :description, :string, null: false
      add :completed, :boolean, default: false, null: false
      add :time_taken, :integer, default: 0
      add :user_id, references(:users, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:tasks, [:user_id])
  end
end
