<?php
 
// Importing DBConfig.php file.
include 'dbconfig.php';
 
// Creating connection.
$con = mysqli_connect($HostName, $HostUser, $HostPass, $DatabaseName);
 
// Getting the received JSON into $json variable.
$json = file_get_contents('php://input');
 
// decoding the received JSON and store into $obj variable.
$obj = json_decode($json,true);
 
 // Populate User name from JSON $obj array and store into $name.
$text = $obj['text'];

// Populate Password from JSON $obj array and store into $password.
$textarea = $obj['textarea'];
 
//Checking Email is already exist or not using SQL query.
$CheckSQL = "SELECT * FROM record WHERE text = '$text'";
 
// Executing SQL Query.
$check = mysqli_fetch_array(mysqli_query($con,$CheckSQL));
 
if(isset($check)){

 // Creating SQL query and insert the record into MySQL database table.
 $Sql_Query = "update record set textarea = '$textarea' where text = '$text'";
 
 if(mysqli_query($con,$Sql_Query)){
 
 // If the record inserted successfully then show the message.
$MSG = 'Record Updated.' ;
 
// Converting the message into JSON format.
$json = json_encode($MSG);
 
// Echo the message.
 echo $json ;
 
 } else {
 
 echo 'Try Again';
 
 }
 
} else {
 
    $RecordExistMSG = 'Record not exist, please try again.';
 
    // Converting the message into JSON format.
    $RecordExistJson = json_encode($RecordExistMSG);
    
    // Echo the message.
    echo $RecordExistJson ;

 }
 mysqli_close($con);
?>