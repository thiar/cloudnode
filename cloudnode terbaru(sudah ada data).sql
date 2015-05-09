-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 10, 2015 at 01:32 AM
-- Server version: 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `cloudnode`
--

-- --------------------------------------------------------

--
-- Table structure for table `app`
--

CREATE TABLE IF NOT EXISTS `app` (
  `idapp` int(11) NOT NULL,
  `nama` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `app`
--

INSERT INTO `app` (`idapp`, `nama`) VALUES
(1, 'Express js'),
(2, 'Sails js');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE IF NOT EXISTS `customer` (
`idCustomer` int(11) NOT NULL,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `province` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `zipcode` varchar(45) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `pass` varchar(45) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`idCustomer`, `firstname`, `lastname`, `address`, `country`, `province`, `city`, `zipcode`, `dob`, `email`, `pass`) VALUES
(1, 'Ahmad', 'Uul', 'Jl teknik kimia', 'indonesia', 'east java', 'surabaya', '12351', '2015-05-06', 'jihad.amrulloh@gmail.com', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `db`
--

CREATE TABLE IF NOT EXISTS `db` (
  `idDB` int(11) NOT NULL,
  `nama` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `db`
--

INSERT INTO `db` (`idDB`, `nama`) VALUES
(1, 'mySQL');

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE IF NOT EXISTS `service` (
`idservice` int(11) NOT NULL,
  `customer_idcustomer` int(11) NOT NULL,
  `namaservice` varchar(45) DEFAULT NULL,
  `memory` varchar(20) NOT NULL,
  `space` varchar(20) NOT NULL,
  `bandwith` varchar(20) NOT NULL,
  `request` varchar(20) NOT NULL,
  `worker` varchar(20) NOT NULL,
  `status` varchar(20) NOT NULL,
  `ip` varchar(25) NOT NULL,
  `port` varchar(6) NOT NULL,
  `app_idapp` int(11) NOT NULL,
  `DB_idDB` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`idservice`, `customer_idcustomer`, `namaservice`, `memory`, `space`, `bandwith`, `request`, `worker`, `status`, `ip`, `port`, `app_idapp`, `DB_idDB`) VALUES
(1, 1, 'Cloud Apps', '501 MB', '15.030 GB', '501 GB', '501000 times/month', '2 worker', 'STOP', '0.0.0.0', '8080', 1, 1),
(9, 1, 'web Clouds', '1 MB', '0.03 GB', '1 GB', '1000 times/month', '1 worker', 'STOP', '0.0.0.0', '8080', 1, 1),
(11, 1, 'CloudNode', '1 MB', '0.03 GB', '1 GB', '1000 times/month', '1 worker', 'STOP', '0.0.0.0', '8080', 1, 1),
(12, 1, 'web storage', '1 MB', '0.03 GB', '1 GB', '1000 times/month', '1 worker', 'STOP', '0.0.0.0', '8080', 1, 1),
(13, 1, 'node', '1 MB', '0.03 GB', '1 GB', '1000 times/month', '1 worker', 'STOP', '0.0.0.0', '8080', 1, 1),
(14, 1, 'a', '1 MB', '0.03 GB', '1 GB', '1000 times/month', '1 worker', 'STOP', '0.0.0.0', '8080', 1, 1),
(29, 1, 'Cloud Apps 2', '1 MB', '0.03 GB', '1 GB', '1000 times/month', '1 worker', 'STOP', '0.0.0.0', '8080', 1, 1),
(36, 1, 'node apps', '499 MB', '14.970 GB', '499 GB', '499000 times/month', '1 worker', 'STOP', '0.0.0.0', '8080', 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `app`
--
ALTER TABLE `app`
 ADD PRIMARY KEY (`idapp`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
 ADD PRIMARY KEY (`idCustomer`);

--
-- Indexes for table `db`
--
ALTER TABLE `db`
 ADD PRIMARY KEY (`idDB`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
 ADD PRIMARY KEY (`idservice`,`app_idapp`,`DB_idDB`), ADD UNIQUE KEY `namaservice` (`namaservice`), ADD KEY `fk_service_app1_idx` (`app_idapp`), ADD KEY `fk_service_DB1_idx` (`DB_idDB`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
MODIFY `idCustomer` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
MODIFY `idservice` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=37;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
