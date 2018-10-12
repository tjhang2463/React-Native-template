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
 
//Checking Email is already exist or not using SQL query.
$CheckSQL = "SELECT * FROM record WHERE text = '$text'";
 
// Executing SQL Query.
$check = mysqli_fetch_array(mysqli_query($con,$CheckSQL));
 
if(isset($check)){

 // Creating SQL query and insert the record into MySQL database table.
 $Sql_Query = "delete from record where text = '$text'";
 
 if(mysqli_query($con,$Sql_Query)){
 
 // If the record inserted successfully then show the message.
$MSG = 'Record Deleted.' ;
 
// Converting the message into JSON format.
$json = json_encode($MSG);
 
// Echo the message.
 echo $json ;
 
 } else {
 
 echo 'Try Again';
 
 }
 
} else {
 
    $RecordNotExistMSG = 'Record not exist, please try again.';
 
    // Converting the message into JSON format.
    $RecordNotExistJson = json_encode($RecordNotExistMSG);
    
    // Echo the message.
    echo $RecordNotExistJson ;

 }
 mysqli_close($con);
?>