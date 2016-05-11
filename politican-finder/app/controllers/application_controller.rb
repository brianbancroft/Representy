class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def index
    @mps = Mp.all
  end

  def show
    @mp = Mp.find(params[:id])
  end

end
