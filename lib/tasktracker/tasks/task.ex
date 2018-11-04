defmodule Tasktracker.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    
    #name of the assignee assigned_to
    field :assignee, :string

    #task completion status
    field :completed, :boolean, default: false

    #description of the task
    field :description, :string

    #time taken for task completion
    field :time_taken, :integer, default: 0
    
    #title of the task
    field :title, :string

    #userid of the assignor assigned_by
    #field :user_id, :id
    belongs_to :user, Tasktracker.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:assignee, :title, :description, :completed, :time_taken, :user_id])
    |> validate_required([:assignee, :title, :description, :completed, :time_taken, :user_id])
  end
end
