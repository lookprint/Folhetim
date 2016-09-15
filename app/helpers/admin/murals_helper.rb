module Admin::MuralsHelper
	def nomeCategoria(id)
      ## TABELA CATEGORIAS
	  case id 
      when 1   
        "Aluno"
	  when 2  
 		"Professor"
 	  when 3    
 		"Outros"
	  else
  		"Nenhum"
      end
	end


	def statusMural(id)
		case id
		when 0
			'<span style="color:#ff0000"><b>Rascunho</b></span>'
		when 1
			'<span style="color:#33af35"><b>Publicado</b></span>'
		else 
			"Indeterminado"
		end
	end


	def post_date(date)
      date.strftime("%d/%m/%Y as %H:%M")
   end
end
