defmodule TasktrackerWeb.TaskView do
  use TasktrackerWeb, :view
  alias TasktrackerWeb.TaskView
  alias TasktrackerWeb.UserView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      assignee: task.assignee,
      title: task.title,
      description: task.description,
      completed: task.completed,
      time_taken: task.time_taken,
      user: render_one(task.user, UserView, "user.json")}
  end
end
