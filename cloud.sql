-- MySQL Script generated by MySQL Workbench
-- 04/24/15 01:12:51
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema cloudnode
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema cloudnode
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cloudnode` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `cloudnode` ;

-- -----------------------------------------------------
-- Table `cloudnode`.`Customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cloudnode`.`Customer` (
  `idCustomer` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NULL,
  `lastname` VARCHAR(45) NULL,
  `address` VARCHAR(200) NULL,
  `country` VARCHAR(45) NULL,
  `province` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `zipcode` VARCHAR(45) NULL,
  `dob` DATE NULL,
  `email` VARCHAR(45) NOT NULL,
  `pass` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCustomer`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cloudnode`.`app`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cloudnode`.`app` (
  `idapp` INT NOT NULL,
  `nama` VARCHAR(45) NULL,
  PRIMARY KEY (`idapp`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cloudnode`.`DB`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cloudnode`.`DB` (
  `idDB` INT NOT NULL,
  `nama` VARCHAR(45) NULL,
  PRIMARY KEY (`idDB`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cloudnode`.`service`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cloudnode`.`service` (
  `idservice` INT NOT NULL AUTO_INCREMENT,
  `namaservice` VARCHAR(45) NULL,
  `app_idapp` INT NOT NULL,
  `DB_idDB` INT NOT NULL,
  PRIMARY KEY (`idservice`, `app_idapp`, `DB_idDB`),
  INDEX `fk_service_app1_idx` (`app_idapp` ASC),
  INDEX `fk_service_DB1_idx` (`DB_idDB` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cloudnode`.`service_has_Customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cloudnode`.`service_has_Customer` (
  `service_idservice` INT NOT NULL,
  `Customer_idCustomer` INT NOT NULL,
  `loot` INT NULL,
  `memory` INT NULL,
  `user` VARCHAR(45) NULL,
  `pass` VARCHAR(45) NULL,
  `nama` VARCHAR(45) NOT NULL,
  `IP` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`service_idservice`, `Customer_idCustomer`),
  INDEX `fk_service_has_Customer_Customer1_idx` (`Customer_idCustomer` ASC),
  INDEX `fk_service_has_Customer_service_idx` (`service_idservice` ASC))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
