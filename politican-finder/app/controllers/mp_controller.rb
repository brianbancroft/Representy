class MpController < ApplicationController
 
  def index
    @mps = Mp.all
  end

  def show
    @mp = Mp.find(params[:id])
  end

end
