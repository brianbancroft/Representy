class MpController < ApplicationController
 
  def index
    @mps = Mp.all.shuffle
  end

  def show
    @mp = Mp.find(params[:id])
  end

end
