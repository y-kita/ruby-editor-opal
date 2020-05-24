require "open3"
require "tempfile"
module Api
  module V1
    class PostsController < ApplicationController
      skip_before_action :verify_authenticity_token
      def create
        output = Opal.compile(params[:code])
        render json: { output: output }
      end
    end
  end
end
