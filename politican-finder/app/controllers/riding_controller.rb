class RidingController < ApplicationController
 
  def index
    @riding = Riding.all
  end

  def show
    @riding = Riding.find(params[:id])
  end

end
