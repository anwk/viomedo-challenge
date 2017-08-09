CREATE DATABASE IF NOT EXISTS viomedo;
USE viomedo;

CREATE TABLE IF NOT EXISTS applications (
  id int(11) NOT NULL AUTO_INCREMENT,
  firstname varchar(50) NOT NULL,
  lastname varchar(50) NOT NULL,
  email varchar(255) NOT NULL,
  age int(99) NOT NULL,
  phone varchar(50) NOT NULL,
  zip int(5) NOT NULL,
  gender varchar(6) NOT NULL,
  termsAccepted varchar(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY (email),
  UNIQUE KEY (phone)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5;