-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema reminder_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema reminder_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `reminder_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `reminder_db` ;

-- -----------------------------------------------------
-- Table `reminder_db`.`tbl_taskstatus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reminder_db`.`tbl_taskstatus` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `statusname` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `reminder_db`.`tbl_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reminder_db`.`tbl_user` (
  `ID` BIGINT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(1000) NULL DEFAULT NULL,
  `fullname` VARCHAR(100) NULL DEFAULT NULL,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  `image` BLOB NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `reminder_db`.`tbl_task`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reminder_db`.`tbl_task` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `task` VARCHAR(200) NULL DEFAULT NULL,
  `taskdetails` VARCHAR(500) NULL DEFAULT NULL,
  `taskstatus` BIGINT NULL DEFAULT NULL,
  `isdeleted` TINYINT NULL DEFAULT NULL,
  `iscompleted` TINYINT NULL DEFAULT NULL,
  `userid` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_task_taskstatus_idx` (`taskstatus` ASC) VISIBLE,
  INDEX `fk_task_userID_idx` (`userid` ASC) VISIBLE,
  CONSTRAINT `fk_task_taskstatus`
    FOREIGN KEY (`taskstatus`)
    REFERENCES `reminder_db`.`tbl_taskstatus` (`id`),
  CONSTRAINT `fk_task_userID`
    FOREIGN KEY (`userid`)
    REFERENCES `reminder_db`.`tbl_user` (`ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
