    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        // Tempo limite para login (em segundos)
        var TEMPO_LIMITE_LOGIN = 120;
        var tempoRestante = TEMPO_LIMITE_LOGIN;
        var cronometro;
        
        // Dados de usuários e saldos (Exemplo: apenas para demonstração)
        var users = [
            { username: 'admin', password: '123456', balance: 5000, investments: [1000, 1500, 2000, 2500] },
            { username: 'joao', password: 'abc123', balance: 2000, investments: [500, 800, 1200, 1800] },
            { username: 'maria', password: 'xyz789', balance: 3000, investments: [700, 1000, 1500, 2000] }
        ];
        
        function verificarLogin() {
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            
            var user = users.find(function(u) {
                return u.username === username && u.password === password;
            });
            
            if (user) {
                exibirTelaUsuario(user);
                iniciarCronometro();
            } else {
                alert('Credenciais inválidas');
            }
        }
        
        function exibirTelaUsuario(user) {
            var saldoElement = document.getElementById('saldo');
            saldoElement.innerHTML = 'Saldo: R$ ' + user.balance.toFixed(2);
            
            var investimentosElement = document.getElementById('investimentos');
            investimentosElement.innerHTML = 'Investimentos:';
            
            var graficoInvestimentos = document.getElementById('grafico-investimentos');
            criarGraficoInvestimentos(graficoInvestimentos, user.investments);
            
            var transferirForm = document.getElementById('transferir-form');
            transferirForm.style.display = 'block';
        }
        
        function transferir() {
            var usuarioDestino = document.getElementById('usuario-destino').value;
            var valorTransferencia = parseFloat(document.getElementById('valor-transferencia').value);
            
            var usuarioOrigem = users.find(function(u) {
                return u.username === document.getElementById('username').value;
            });
            
            var usuarioDestinoObj = users.find(function(u) {
                return u.username === usuarioDestino;
            });
            
            if (usuarioOrigem && usuarioDestinoObj && valorTransferencia > 0 && valorTransferencia <= usuarioOrigem.balance) {
                usuarioOrigem.balance -= valorTransferencia;
                usuarioDestinoObj.balance += valorTransferencia;
                
                alert('Transferência realizada com sucesso!');
                
                // Atualizar exibição do saldo
                exibirTelaUsuario(usuarioOrigem);
            } else {
                alert('Erro ao realizar transferência. Por favor, verifique os dados e saldo disponível.');
            }
        }
        
        function iniciarCronometro() {
            cronometro = setInterval(function() {
                tempoRestante--;
                
                // Atualizar exibição do cronômetro
                document.getElementById('tempo-restante').textContent = tempoRestante;
                
                // Verificar se o tempo restante chegou a zero
                if (tempoRestante <= 0) {
                    encerrarLoginAutomatico();
                }
            }, 1000);
        }
        
        function encerrarLoginAutomatico() {
            clearInterval(cronometro);
            
            // Redefinir formulário de login
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            
            alert('Tempo de login excedido. Por favor, refaça o login.');
            
            // Esconder tela de usuário
            var telaUsuario = document.getElementById('tela-usuario');
            telaUsuario.style.display = 'none';
            
            // Resetar tempo restante
            tempoRestante = TEMPO_LIMITE_LOGIN;
            document.getElementById('tempo-restante').textContent = tempoRestante;
        }
        
        function criarGraficoInvestimentos(elemento, dados) {
            var ctx = elemento.getContext('2d');
            
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Mês 1', 'Mês 2', 'Mês 3', 'Mês 4'],
                    datasets: [{
                        label: 'Investimentos',
                        data: dados,
                        backgroundColor: 'rgba(0, 123, 255, 0.2)',
                        borderColor: 'rgba(0, 123, 255, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    </script>
</head>
<body>
    <header>
        <h1>Banco XYZ</h1>
    </header>
    <main>
        <form onsubmit="event.preventDefault(); verificarLogin();">
            <label for="username">Usuário:</label>
            <input type="text" id="username" placeholder="Digite seu usuário" required>
            
            <label for="password">Senha:</label>
            <input type="password" id="password" placeholder
