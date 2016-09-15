module ApplicationHelper

	def dirNAme(url) 
		if url == 'sessions' 
			"Login"
		elsif url == 'passwords'
			"Recuperar Conta"
		end
	end

	
	
end
