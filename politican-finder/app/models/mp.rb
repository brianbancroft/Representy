class Mp < ActiveRecord::Base
  
  belongs_to :riding

  validates :name, presence: true
  validates :party, presence: true
  validates :cons_address, presence: true
  # validates :cons_phone, presence: true
  validates :email, presence: true
  validates :photo, presence: true
  # validates_format_of :cons_phone, with: /\A\d{3}[\s-]?\d{3}[\s-]?\d{4}\z/
  # validates_format_of :email, with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/


end


