<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["name"]) && isset($_POST["email"]) && isset($_POST["phone"]) && isset($_POST["address"]) && isset($_POST["cpf"]) && isset($_POST["username"]) && isset($_POST["password"])) {
        
        $servername = "seu_servidor";
        $username = "seu_usuario";
        $password = "sua_senha";
        $dbname = "trabalho";

        $conn = new mysqli($servername, $username, $password, $dbname);

        if ($conn->connect_error) {
            die("Conexão falhou: " . $conn->connect_error);
        }

        $name = $_POST["name"];
        $email = $_POST["email"];
        $phone = $_POST["phone"];
        $address = $_POST["address"];
        $cpf = $_POST["cpf"];
        $username = $_POST["username"];
        $password = $_POST["password"];

        $sql = "INSERT INTO usuarios (nm, email, cpf, endereco, tel, usu, senha)
        VALUES ('$name', '$email', '$cpf', '$address', '$phone', '$username', '$password')";

        if ($conn->query($sql) === TRUE) {
            echo "Registro inserido com sucesso!";
        } else {
            echo "Erro ao inserir registro: " . $conn->error;
        }

        $conn->close();
    } else {
        echo "Por favor, preencha todos os campos do formulário.";
    }
}
?>
