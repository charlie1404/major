<?php
$con = mysqli_connect("localhost","test","","test");

if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  die('Error in Connection');
}

Class SendgridParse {
  private function parseEmailAddress($raw) {
    $name = "";
    $email = trim($raw, " '\"");
    if (preg_match("/^(.*)<(.*)>.*$/", $raw, $matches)) {
      array_shift($matches);
      $name = trim($matches[0], " '\"");
      $email = trim($matches[1], " '\"");
    }
    return array(
      "name" => $name,
      "email" => $email,
      "full" => $name . " <" . $email . ">"
    );
  }

  private function parseEmailAddresses($raw) {
    $arr = array();
    foreach(explode(",", $raw) as $email)
      $arr[] = $this->parseEmailAddress($email);
    return $arr;
  }

  private function parseHeaders($raw) {
    $arr = array();
    $i = 0;
    foreach(explode("\n", $raw) as $header){
      $final_header = explode(': ', $header);
      if (array_key_exists($final_header[0],$arr))
        $arr[$final_header[0].$i] = $final_header[1];
      else
        $arr[$final_header[0]] = $final_header[1];
      $i++;
    }
    return $arr;
  }

  function __construct($post = NULL, $files = NULL) {
    if (!@$post)
      $post = $_POST;
    if (!@$files)
      $files = $_FILES;
        //$this->post = $post;
        //$this->files = $files;

    $this->headers = $this->parseHeaders(@$post["headers"]);
    $this->text = @$post["text"];
    $this->html = @$post["html"];
    $this->fromRaw = @$post["from"];
    $this->from = $this->parseEmailAddress(@$this->fromRaw);
    $this->toRaw = @$post["to"];
    $this->to = $this->parseEmailAddresses(@$this->toRaw);
    $this->ccRaw = @$post["cc"];
    $this->cc = $this->parseEmailAddresses(@$this->ccRaw);
    $this->subject = @$post["subject"];
    $this->dkimRaw = @$post["dkim"];
    $this->dkim = json_decode(@$this->dkimRaw);
    $this->spfRaw = @$post["SPF"];
    $this->spf = json_decode(@$this->spfRaw);
    $this->charsetsRaw = @$post["charsets"];
    $this->charsets = json_decode(@$this->charsetsRaw);
    $this->envelopeRaw = @$post["envelope"];
    $this->envelope = json_decode(@$this->envelopeRaw);
    $this->spam_score = @$post["spam_score"];
    $this->spam_report = @$post["spam_report"];

    $this->attachments = array();
    foreach ($files as $key=>$value)
      $this->attachments[] = $value;
  }

}

$objs = new SendgridParse($_POST);
$arr = new stdClass();
foreach($objs as $key =>$obj){
  if(is_array($obj) || is_object($obj))
    $arr->$key = mysqli_real_escape_string($con, json_encode($obj));
  else
    $arr->$key = mysqli_real_escape_string($con, $obj);
}

mysqli_query(
  $con,
  "INSERT INTO `raw_mails`(
    `headers`,
    `text1`,
    `html`,
    `fromRaw`,
    `from1`,
    `toRaw`,
    `to`,
    `ccRaw`,
    `cc`,
    `subject`,
    `dkimRaw`,
    `dkim`,
    `spfRaw`,
    `spf`,
    `charsetsRaw`,
    `charsets`,
    `envelopeRaw`,
    `envelope`,
    `spam_score`,
    `spam_report`,
    `attachments`
  )
  VALUES (
    '$arr->headers',
    '$arr->text',
    '$arr->html',
    '$arr->fromRaw',
    '$arr->from',
    '$arr->toRaw',
    '$arr->to',
    '$arr->ccRaw',
    '$arr->cc',
    '$arr->subject',
    '$arr->dkimRaw',
    '$arr->dkim',
    '$arr->spfRaw',
    '$arr->spf',
    '$arr->charsetsRaw',
    '$arr->charsets',
    '$arr->envelopeRaw',
    '$arr->envelope',
    '$arr->spam_score',
    '$arr->spam_report',
    '$arr->attachments'
  )"
);

$email = $objs->from['email'];

mysqli_query(
  $con,
  "INSERT INTO `message`(
    `receiver`,
    `date`,
    `message_id`,
    `subject`,
    `body`,
    `fromEmail`
  )
  VALUES (
    '$arr->toRaw',
    NOW(),
    '$arr->fromRaw',
    '$arr->subject',
    '$arr->text',
    '$email'
  )"
);
?>

