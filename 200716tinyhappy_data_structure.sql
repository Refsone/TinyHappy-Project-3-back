-- MySQL dump 10.13  Distrib 8.0.20, for Linux (x86_64)
--
-- Host: localhost    Database: tinyhappy
-- ------------------------------------------------------
-- Server version	8.0.20-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `color_family` (
  `id` int NOT NULL AUTO_INCREMENT,
  `color` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `color_family`
--

LOCK TABLES `color_family` WRITE;
/*!40000 ALTER TABLE `color_family` DISABLE KEYS */;
INSERT INTO `color_family` VALUES (1,'#E9FEFC'),(2,'#F2FFD7'),(3,'#E9EFFA'),(4,'#FFE7EC'),(5,'#FFEDD7'),(6,'#FEFFC5'),(7,'#F6EAFF'),(8,'#DAFFD7');
/*!40000 ALTER TABLE `color_family` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mail` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES (5,'auxence.b@gmail.com'),(6,'abdou@gmail.com'),(29,'jerome.potie@gmail.com'),(30,'auxence.blondel@gmail.com'),(31,'hipro90@gmail.com'),(32,'auxence_6033@hotmail.fr'),(34,'benoitjerome83@gmail.com'),(42,'auxence.blondel@gmail.com'),(43,'auxence_6033@hotmail.fr');
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `family_member`
--

DROP TABLE IF EXISTS `family_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `family_member` (
  `id` int NOT NULL AUTO_INCREMENT,
  `family_firstname` varchar(55) NOT NULL,
  `family_lastname` varchar(100) DEFAULT NULL,
  `family_surname` varchar(20) DEFAULT NULL,
  `family_birthday` date DEFAULT NULL,
  `color_family_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_family_member_color_family_id` (`color_family_id`),
  KEY `fk_family_member_user1_idx` (`user_id`),
  CONSTRAINT `fk_family_member_color_family_id` FOREIGN KEY (`color_family_id`) REFERENCES `color_family` (`id`),
  CONSTRAINT `fk_family_member_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `family_member`
--

LOCK TABLES `family_member` WRITE;
/*!40000 ALTER TABLE `family_member` DISABLE KEYS */;
INSERT INTO `family_member` VALUES (7,'Margaux','','Gogo','1997-07-19',7,15);
/*!40000 ALTER TABLE `family_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `family_moment`
--

DROP TABLE IF EXISTS `family_moment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `family_moment` (
  `family_member_id` int NOT NULL,
  `moment_id` int NOT NULL,
  PRIMARY KEY (`family_member_id`,`moment_id`),
  KEY `fk_family_member_has_moment_moment1_idx` (`moment_id`),
  KEY `fk_family_member_has_moment_family_member1_idx` (`family_member_id`),
  CONSTRAINT `fk_family_member_has_moment_family_member` FOREIGN KEY (`family_member_id`) REFERENCES `family_member` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_family_member_has_moment_moment` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `family_moment`
--

LOCK TABLES `family_moment` WRITE;
/*!40000 ALTER TABLE `family_moment` DISABLE KEYS */;
INSERT INTO `family_moment` VALUES (7,76),(7,77),(7,104),(7,107);
/*!40000 ALTER TABLE `family_moment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moment`
--

DROP TABLE IF EXISTS `moment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `moment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_isPresent` tinyint(1) DEFAULT NULL,
  `moment_text` text NOT NULL,
  `moment_context` text,
  `moment_event_date` date NOT NULL,
  `moment_favorite` tinyint(1) DEFAULT NULL,
  `user_id` int NOT NULL,
  `moment_type_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_moment_user1_idx` (`user_id`),
  KEY `fk_moment_moment_type1_idx` (`moment_type_id`),
  CONSTRAINT `fk_moment_moment_type1` FOREIGN KEY (`moment_type_id`) REFERENCES `moment_type` (`id`),
  CONSTRAINT `fk_moment_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moment`
--

LOCK TABLES `moment` WRITE;
/*!40000 ALTER TABLE `moment` DISABLE KEYS */;
INSERT INTO `moment` VALUES (76,1,'1er moment perso, j\'ai reussi à faire passer l\'id','Vendredi 20h avec une biere à la main','2020-07-10',0,15,2),(77,0,'J\'ai faim, laches ton ordi !','','2020-07-10',1,15,1),(104,1,'Hackaaaaton','','2020-06-26',NULL,15,1),(107,1,'Bientôt la rando !!','','2020-07-13',1,15,1),(135,1,'a','','2020-07-14',NULL,15,1);
/*!40000 ALTER TABLE `moment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moment_type`
--

DROP TABLE IF EXISTS `moment_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `moment_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moment_type`
--

LOCK TABLES `moment_type` WRITE;
/*!40000 ALTER TABLE `moment_type` DISABLE KEYS */;
INSERT INTO `moment_type` VALUES (1,'quote'),(2,'milestone');
/*!40000 ALTER TABLE `moment_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parameter`
--

DROP TABLE IF EXISTS `parameter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parameter` (
  `id` int NOT NULL AUTO_INCREMENT,
  `display_birthday` tinyint(1) DEFAULT '0',
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_parameter_user1_idx` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parameter`
--

LOCK TABLES `parameter` WRITE;
/*!40000 ALTER TABLE `parameter` DISABLE KEYS */;
INSERT INTO `parameter` VALUES (1,1,0),(3,0,0),(4,1,15);
/*!40000 ALTER TABLE `parameter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_firstname` varchar(55) NOT NULL,
  `user_lastname` varchar(100) NOT NULL,
  `user_mail` varchar(100) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_surname` varchar(50) DEFAULT NULL,
  `user_temp_password` varchar(255) DEFAULT NULL,
  `temp_password_limit` bigint DEFAULT NULL,
  `user_birthday` date DEFAULT NULL,
  `color_family_id` int DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_mail` (`user_mail`),
  KEY `fk_user_color_family_id_idx` (`color_family_id`),
  CONSTRAINT `fk_user_color_family_id` FOREIGN KEY (`color_family_id`) REFERENCES `color_family` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (15,'Auxence','Blondel','auxence.blondel@gmail.com','$2a$10$M6fbIAwn2HfKiBtvQ2EUf.ifoRxhBoi303U3wxgKvP7fEtoVsJMzq','Auxi','$2a$10$TR2gUwcDg4QoVf0gX6W2LeR8wLxLbL2GT2jmUf0Y1J9O.odkovDdi',1594807109570,'1995-07-22',6);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_contact`
--

DROP TABLE IF EXISTS `user_contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_contact` (
  `user_id` int NOT NULL,
  `contact_id` int NOT NULL,
  KEY `fk_user_contact_user_id` (`user_id`),
  KEY `fk_user_contact_contact_id` (`contact_id`),
  CONSTRAINT `fk_user_contact_contact_id` FOREIGN KEY (`contact_id`) REFERENCES `contact` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user_contact_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_contact`
--

LOCK TABLES `user_contact` WRITE;
/*!40000 ALTER TABLE `user_contact` DISABLE KEYS */;
INSERT INTO `user_contact` VALUES (15,42),(15,43);
/*!40000 ALTER TABLE `user_contact` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-16 12:00:46
