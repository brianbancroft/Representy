class Riding < ActiveRecord::Base
  
  has_one :mp, -> { includes :mp }

  validates :name, presence: true

end


