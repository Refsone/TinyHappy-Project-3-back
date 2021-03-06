CREATE DATABASE  IF NOT EXISTS `tinyhappy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `tinyhappy`;
-- MySQL dump 10.13  Distrib 5.7.30, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: tinyhappy
-- ------------------------------------------------------
-- Server version	5.7.30-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `color_family`
--

DROP TABLE IF EXISTS `color_family`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `color_family` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `color` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mail` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `family_member`
--

DROP TABLE IF EXISTS `family_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `family_member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `family_firstname` varchar(55) NOT NULL,
  `family_lastname` varchar(100) DEFAULT NULL,
  `family_surname` varchar(20) DEFAULT NULL,
  `family_birthday` date DEFAULT NULL,
  `color_family_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_family_member_color_family_id` (`color_family_id`),
  KEY `fk_family_member_user1_idx` (`user_id`),
  CONSTRAINT `fk_family_member_color_family_id` FOREIGN KEY (`color_family_id`) REFERENCES `color_family` (`id`),
  CONSTRAINT `fk_family_member_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `family_moment`
--

DROP TABLE IF EXISTS `family_moment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `family_moment` (
  `family_member_id` int(11) NOT NULL,
  `moment_id` int(11) NOT NULL,
  PRIMARY KEY (`family_member_id`,`moment_id`),
  KEY `fk_family_member_has_moment_moment1_idx` (`moment_id`),
  KEY `fk_family_member_has_moment_family_member1_idx` (`family_member_id`),
  CONSTRAINT `fk_family_member_has_moment_family_member` FOREIGN KEY (`family_member_id`) REFERENCES `family_member` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_family_member_has_moment_moment` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `moment`
--

DROP TABLE IF EXISTS `moment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `moment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_isPresent` tinyint(1) DEFAULT NULL,
  `moment_text` text NOT NULL,
  `moment_context` text,
  `moment_event_date` date NOT NULL,
  `moment_favorite` tinyint(1) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `moment_type_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_moment_user1_idx` (`user_id`),
  KEY `fk_moment_moment_type1_idx` (`moment_type_id`),
  CONSTRAINT `fk_moment_moment_type1` FOREIGN KEY (`moment_type_id`) REFERENCES `moment_type` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_moment_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `moment_type`
--

DROP TABLE IF EXISTS `moment_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `moment_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `parameter`
--

DROP TABLE IF EXISTS `parameter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parameter` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `display_birthday` tinyint(1) DEFAULT '0',
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_parameter_user1_idx` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_firstname` varchar(55) NOT NULL,
  `user_lastname` varchar(100) NOT NULL,
  `user_mail` varchar(100) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_surname` varchar(50) DEFAULT NULL,
  `user_temp_password` varchar(255) DEFAULT NULL,
  `temp_password_limit` bigint(20) DEFAULT NULL,
  `user_birthday` date DEFAULT NULL,
  `color_family_id` int(11) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_mail` (`user_mail`),
  KEY `fk_user_color_family_id_idx` (`color_family_id`),
  CONSTRAINT `fk_user_color_family_id` FOREIGN KEY (`color_family_id`) REFERENCES `color_family` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_contact`
--

DROP TABLE IF EXISTS `user_contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_contact` (
  `user_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  KEY `fk_user_contact_user_id` (`user_id`),
  KEY `fk_user_contact_contact_id` (`contact_id`),
  CONSTRAINT `fk_user_contact_contact_id` FOREIGN KEY (`contact_id`) REFERENCES `contact` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user_contact_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

--
-- Dumping data for table `color_family`
--

LOCK TABLES `color_family` WRITE;
/*!40000 ALTER TABLE `color_family` DISABLE KEYS */;
INSERT INTO `color_family` VALUES (1,'#E9FEFC'),(2,'#F2FFD7'),(3,'#E9EFFA'),(4,'#FFE7EC'),(5,'#FFEDD7'),(6,'#FEFFC5'),(7,'#F6EAFF'),(8,'#DAFFD7');
/*!40000 ALTER TABLE `color_family` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `moment_type`
--

LOCK TABLES `moment_type` WRITE;
/*!40000 ALTER TABLE `moment_type` DISABLE KEYS */;
INSERT INTO `moment_type` VALUES (1,'quote'),(2,'milestone');
/*!40000 ALTER TABLE `moment_type` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-28 17:24:18
