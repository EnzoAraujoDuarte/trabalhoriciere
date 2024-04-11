<?php
$servername = "localhost";
$username = "seu_usuario";
$password = "sua_senha";
$dbname = "trabalho";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Erro na conexão com o banco de dados: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM usuarios WHERE usu='$username' AND senha='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        header("Location: sucesso.php");
        exit();
    } else {
        echo "Usuário ou senha incorretos.";
    }
}

$conn->close();
?>
