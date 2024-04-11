<?php
session_start(); 

if(isset($_SESSION['username'])) {
    $username = $_SESSION['username']; 
} else {

    header("Location: login.html");
    exit();
}

$conn = new mysqli('localhost', 'trabalho');

if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

$stmt = $conn->prepare("SELECT id_usuario FROM usuarios WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt->bind_result($user_id);
    $stmt->fetch();

    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        $insert_stmt = $conn->prepare("INSERT INTO livros (nm_livro, autor, editora, paginas, capa, sinopse, id_usuario) VALUES (?, ?, ?, ?, ?, ?, ?)");

        $insert_stmt->bind_param("sssiisi", $nome, $autor, $editor, $paginas, $capa, $sinopse, $user_id);

        $nome = $_POST['bookName'];
        $autor = $_POST['bookAuthor'];
        $editor = $_POST['bookPublisher'];
        $paginas = $_POST['numberOfPages'];
        $capa = $_POST['bookCover'];
        $sinopse = $_POST['synopsis'];

        if ($insert_stmt->execute()) {
            echo "Livro cadastrado com sucesso!";
        } else {
            echo "Erro ao cadastrar o livro: " . $insert_stmt->error;
        }

        $insert_stmt->close();
    }
} else {
    echo "Usuário não encontrado.";
}

$stmt->close();
$conn->close();
?>
