class Admin::MuralsController < Admin::BaseController
  before_action :set_admin_mural, only: [:show, :edit, :update, :destroy]
 # before_action :authenticate_admin!
  # GET /admin/murals
  # GET /admin/murals.json
  def index
    @admin_murals = Admin::Mural.all
  end

  # GET /admin/murals/1
  # GET /admin/murals/1.json
  def show
  end

  # GET /admin/murals/new
  def new
    @admin_mural = Admin::Mural.new
  end

  # GET /admin/murals/1/edit
  def edit
  end

  # POST /admin/murals
  # POST /admin/murals.json
  def create
    @admin_mural = Admin::Mural.new(admin_mural_params)

    respond_to do |format|
      if @admin_mural.save
        format.html { redirect_to @admin_mural, notice: 'Mural was successfully created.' }
        format.json { render :show, status: :created, location: @admin_mural }
      else
        format.html { render :new }
        format.json { render json: @admin_mural.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /admin/murals/1
  # PATCH/PUT /admin/murals/1.json
  def update
    respond_to do |format|
      if @admin_mural.update(admin_mural_params)
        format.html { redirect_to @admin_mural, notice: 'Mural was successfully updated.' }
        format.json { render :show, status: :ok, location: @admin_mural }
      else
        format.html { render :edit }
        format.json { render json: @admin_mural.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/murals/1
  # DELETE /admin/murals/1.json
  def destroy
    @admin_mural.destroy
    respond_to do |format|
      format.html { redirect_to admin_murals_url, notice: 'Mural was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_admin_mural
      @admin_mural = Admin::Mural.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def admin_mural_params
      params.require(:admin_mural).permit(:text, :title)
    end
end
