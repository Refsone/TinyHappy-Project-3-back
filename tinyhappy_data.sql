-- MySQL dump 10.13  Distrib 5.7.30, for Linux (x86_64)
--
-- Host: localhost    Database: tinyhappy
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
-- Dumping data for table `color_family`
--

LOCK TABLES `color_family` WRITE;
/*!40000 ALTER TABLE `color_family` DISABLE KEYS */;
INSERT INTO `color_family` VALUES (1,'#B6C5E6'),(2,'#FFB8D5'),(3,'#BDFBFE'),(4,'#E9FFC3'),(5,'#FFEDD7'),(6,'#FEFFC5'),(7,'#F6EAFF'),(8,'#DAFFD7');
/*!40000 ALTER TABLE `color_family` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES (6,'abdou@gmail.com'),(2,'anna@gmail.com'),(5,'auxence.b@gmail.com'),(1,'contact@gmail.com');
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `family_member`
--

LOCK TABLES `family_member` WRITE;
/*!40000 ALTER TABLE `family_member` DISABLE KEYS */;
INSERT INTO `family_member` VALUES (1,'Louise',NULL,'Loulou',NULL,2,1),(2,'Marie',NULL,'Mama',NULL,3,1),(3,'Violette',NULL,NULL,NULL,4,1);
/*!40000 ALTER TABLE `family_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `family_moment`
--

LOCK TABLES `family_moment` WRITE;
/*!40000 ALTER TABLE `family_moment` DISABLE KEYS */;
INSERT INTO `family_moment` VALUES (3,3),(1,13),(3,13),(2,14),(3,15),(1,16);
/*!40000 ALTER TABLE `family_moment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `moment`
--

LOCK TABLES `moment` WRITE;
/*!40000 ALTER TABLE `moment` DISABLE KEYS */;
INSERT INTO `moment` VALUES (3,0,'“Hey Louise, arrête de faire du foin-foin là !”','En parlant à sa soeur qui est un peu bruyante.','2020-05-12',0,1,2),(13,0,'Les filles ont fabriqué une cabane avec tous les éléments mobiles de l’appart. 30 minutes de rangement, youpi.',NULL,'2020-05-09',1,1,1),(14,1,'Les filles sont chez les grands-parents !!!!Liberés, délivrés !',NULL,'2020-05-09',0,1,1),(15,0,'“Dis papa, tu connais l’histoire de la coquillette molle ?”',NULL,'2020-05-07',0,1,2),(16,0,'Elle a fait ses premiers pas !!',NULL,'2020-05-02',0,1,1);
/*!40000 ALTER TABLE `moment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `moment_type`
--

LOCK TABLES `moment_type` WRITE;
/*!40000 ALTER TABLE `moment_type` DISABLE KEYS */;
INSERT INTO `moment_type` VALUES (1,'quote'),(2,'milestone');
/*!40000 ALTER TABLE `moment_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `parameter`
--

LOCK TABLES `parameter` WRITE;
/*!40000 ALTER TABLE `parameter` DISABLE KEYS */;
INSERT INTO `parameter` VALUES (1,1),(3,0);
/*!40000 ALTER TABLE `parameter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Jérôme','Benoit','jeromebenoit@gmail.com','azerty',NULL,NULL,1),(6,'Jérôme ','Potié','jeromepotie@gmail','bidule',NULL,NULL,1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_contact`
--

LOCK TABLES `user_contact` WRITE;
/*!40000 ALTER TABLE `user_contact` DISABLE KEYS */;
INSERT INTO `user_contact` VALUES (1,1),(1,2),(6,5),(6,6),(6,2);
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

-- Dump completed on 2020-06-14 22:49:13
