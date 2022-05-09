import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import styles from './AudioPlayer.module.css'
import cn from 'classnames'
import { useAudioContext } from '../../context/AudioContext'
import { Bars } from 'react-loader-spinner'
import Image from 'next/image'
import { ProfileName } from '../profile'
import Link from 'next/link'
import { NftType } from '../../common/graphql/schema.d'

export type AudioPlayerProps = {
  url?: string
  play?: boolean
  name?: string
  className?: string
  creatorName?: string
  trackPictureUrl?: string
  creatorEthAddress?: string
  id?: string
  contractAddress?: string
  nftType?: NftType
}

//TODO: save waveform in backend https://stackoverflow.com/questions/45165921/wavesurfer-how-to-speed-up-the-process-of-playing-music
const pcmData = [
  0.0095, -0.0053, 0.0318, -0.0348, 0.0357, -0.0142, 0.0342, -0.0315, 0.0468,
  -0.0351, 0.0358, -0.0365, 0.0484, -0.0479, 0.053, -0.0311, 0.0298, -0.0415,
  0.0208, -0.0293, 0.02, -0.0275, 0.0279, -0.0342, 0.0313, -0.0265, 0.0464,
  -0.0348, 0.0364, -0.043, 0.0548, -0.0439, 0.035, -0.0503, 0.0562, -0.0718,
  0.0423, -0.0983, 0.0788, -0.0411, 0.1013, -0.1462, 0.1824, -0.1548, 0.0964,
  -0.1487, 0.0843, -0.1304, 0.0506, -0.0513, 0.0441, -0.0643, 0.063, -0.0967,
  0.0842, -0.1005, 0.0839, -0.1246, 0.1058, -0.1036, 0.0703, -0.0574, 0.0636,
  -0.2003, 0.0683, -0.08, 0.1163, -0.1084, 0.099, -0.1142, 0.1003, -0.0813,
  0.0305, -0.0762, 0.0549, -0.0703, 0.0587, -0.0557, 0.0335, -0.0351, 0.0198,
  -0.0174, 0.012, -0.0224, 0.0127, -0.0257, 0.0391, -0.0123, 0.0415, -0.0292,
  0.0584, -0.0418, 0.0329, -0.022, 0.0399, -0.0298, 0.0434, -0.0316, 0.0527,
  -0.0428, 0.033, -0.0448, 0.0402, -0.0389, 0.09, -0.0516, 0.055, -0.0936,
  0.0557, -0.0406, 0.0922, -0.0974, 0.0634, -0.0894, 0.0997, -0.1532, 0.1245,
  -0.0763, 0.2439, -0.0944, 0.1234, -0.0896, 0.1516, -0.1187, 0.1582, -0.1153,
  0.1117, -0.1135, 0.1649, -0.1506, 0.1414, -0.0867, 0.1535, -0.1975, 0.163,
  -0.1423, 0.1917, -0.1626, 0.1446, -0.1107, 0.1773, -0.153, 0.1178, -0.1815,
  0.2167, -0.2827, 0.1272, -0.1811, 0.2172, -0.1946, 0.2497, -0.1843, 0.0902,
  -0.1798, 0.1399, -0.1936, 0.1549, -0.087, 0.1595, -0.1971, 0.1281, -0.1829,
  0.1495, -0.1827, 0.1002, -0.1907, 0.1377, -0.1424, 0.0129, -0.0587, 0.0151,
  -0.0199, 0.0216, -0.0199, 0.015, -0.0111, 0.0195, -0.0129, 0.0465, -0.0305,
  0.0546, -0.0466, 0.0448, -0.0298, 0.0125, -0.0114, 0.0101, -0.0226, 0.0117,
  -0.0218, 0.0286, -0.0276, 0.0186, -0.0329, 0.0875, -0.0286, 0.0502, -0.0208,
  0.0582, -0.0513, 0.0622, -0.0171, 0.0312, -0.0351, 0.0397, -0.0371, 0.0195,
  -0.024, 0.0355, -0.0361, 0.031, -0.0239, 0.0477, -0.078, 0.0347, -0.032,
  0.0489, -0.0294, 0.0352, -0.0358, 0.0338, -0.0519, 0.014, -0.0329, 0.0417,
  -0.0479, 0.0456, -0.0432, 0.0641, -0.0394, 0.0401, -0.0332, 0.073, -0.0635,
  0.0391, -0.0336, 0.0534, -0.0442, 0.0335, -0.0634, 0.0502, -0.0577, 0.0396,
  -0.0418, 0.0461, -0.0522, 0.0349, -0.0829, 0.0559, -0.1138, 0.0895, -0.0423,
  0.0631, -0.0886, 0.117, -0.0912, 0.0957, -0.0821, 0.0929, -0.1197, 0.0668,
  -0.0571, 0.0792, -0.1222, 0.0574, -0.0652, 0.0514, -0.1021, 0.1343, -0.0989,
  0.0948, -0.0873, 0.1295, -0.0757, 0.106, -0.101, 0.0577, -0.12, 0.0732,
  -0.1515, 0.1378, -0.2558, 0.1341, -0.2044, 0.1233, -0.1608, 0.1323, -0.1386,
  0.0834, -0.0897, 0.1312, -0.2698, 0.135, -0.1461, 0.1278, -0.0981, 0.1971,
  -0.1059, 0.1165, -0.0747, 0.2533, -0.0824, 0.0361, -0.0571, 0.0414, -0.0629,
  0.0878, -0.1594, 0.0653, -0.1075, 0.1225, -0.1165, 0.2729, -0.2141, 0.142,
  -0.1992, 0.1992, -0.1654, 0.1078, -0.224, 0.165, -0.1105, 0.1478, -0.074,
  0.0932, -0.0297, 0.1129, -0.1313, 0.0617, -0.1218, 0.1083, -0.0864, 0.1029,
  -0.0602, 0.1182, -0.0409, 0.1125, -0.0813, 0.1288, -0.1402, 0.0726, -0.1711,
  0.133, -0.0667, 0.1758, -0.1438, 0.1358, -0.1798, 0.2031, -0.1257, 0.0776,
  -0.1444, 0.217, -0.0989, 0.178, -0.1741, 0.1212, -0.0977, 0.1812, -0.1989,
  0.254, -0.2286, 0.221, -0.1234, 0.187, -0.2129, 0.2333, -0.1644, 0.2641,
  -0.2271, 0.3329, -0.2382, 0.1717, -0.3829, 0.1727, -0.1094, 0.1605, -0.2181,
  0.2302, -0.1733, 0.1769, -0.2851, 0.233, -0.3903, 0.2663, -0.2564, 0.185,
  -0.158, 0.226, -0.1185, 0.1211, -0.0967, 0.1287, -0.1415, 0.0986, -0.1806,
  0.0804, -0.1134, 0.0289, -0.0592, 0.0261, -0.0512, 0.0282, -0.0217, 0.016,
  -0.0412, 0.0377, -0.0215, 0.0596, -0.0158, 0.031, -0.029, 0.0282, -0.0325,
  0.02, -0.0248, 0.0288, -0.0174, 0.0178, -0.0445, 0.0197, -0.0193, 0.0309,
  -0.0079, 0.0104, -0.0259, 0.0138, -0.0136, 0.0119, -0.016, 0.0244, -0.0165,
  0.035, -0.0545, 0.0492, -0.0206, 0.0267, -0.033, 0.0303, -0.0405, 0.0451,
  -0.0401, 0.0333, -0.0195, 0.0385, -0.0274, 0.029, -0.0371, 0.0316, -0.0256,
  0.0257, -0.0252, 0.0295, -0.0324, 0.0413, -0.0277, 0.0441, -0.0274, 0.0291,
  -0.032, 0.0374, -0.0318, 0.0491, -0.0409, 0.0687, -0.038, 0.1058, -0.0858,
  0.0727, -0.0818, 0.0855, -0.075, 0.0711, -0.0819, 0.1062, -0.1468, 0.1518,
  -0.1097, 0.2195, -0.1744, 0.0852, -0.0665, 0.0311, -0.0296, 0.0665, -0.0432,
  0.0627, -0.0504, 0.0778, -0.0955, 0.0885, -0.0956, 0.0857, -0.1284, 0.1364,
  -0.084, 0.083, -0.0972, 0.0982, -0.1299, 0.1087, -0.1154, 0.1235, -0.0992,
  0.0529, -0.0687, 0.0662, -0.0556, 0.0773, -0.0851, 0.0332, -0.0514, 0.018,
  -0.03, 0.0197, -0.0176, 0.027, -0.0336, 0.0258, -0.0347, 0.0346, -0.0217,
  0.0395, -0.0284, 0.0369, -0.0405, 0.0361, -0.028, 0.0395, -0.0408, 0.0377,
  -0.044, 0.046, -0.0412, 0.0348, -0.028, 0.0376, -0.0464, 0.1374, -0.1554,
  0.1039, -0.0916, 0.0354, -0.0272, 0.0706, -0.1359, 0.0736, -0.0687, 0.1481,
  -0.1326, 0.1459, -0.1236, 0.1338, -0.104, 0.1605, -0.0815, 0.1703, -0.1279,
  0.1492, -0.0894, 0.0687, -0.152, 0.2164, -0.1956, 0.0885, -0.1324, 0.1866,
  -0.1174, 0.1831, -0.149, 0.1502, -0.1368, 0.1762, -0.1971, 0.1483, -0.2268,
  0.0929, -0.1584, 0.1881, -0.2752, 0.1575, -0.1042, 0.2252, -0.2187, 0.1227,
  -0.1585, 0.1378, -0.0688, 0.1882, -0.1346, 0.1618, -0.1151, 0.1737, -0.1429,
  0.1578, -0.1877, 0.207, -0.127, 0.1462, -0.1164, 0.0319, -0.066, 0.0326,
  -0.0189, 0.0252, -0.0115, 0.0127, -0.0321, 0.0075, -0.0257, 0.0151, -0.0506,
  0.0312, -0.0308, 0.0378, -0.0326, 0.0337, -0.0233, 0.0217, -0.0127, 0.012,
  -0.0151, 0.0395, -0.0246, 0.0504, -0.0734, 0.038, -0.0303, 0.0482, -0.0163,
  0.0469, -0.0461, 0.0182, -0.0916, 0.0216, -0.0332, 0.052, -0.0151, 0.0327,
  -0.0316, 0.0476, -0.0293, 0.046, -0.0358, 0.053, -0.0688, 0.0506, -0.0304,
  0.0299, -0.0531, 0.0358, -0.0502, 0.0344, -0.0768, 0.03, -0.0219, 0.0996,
  -0.0321, 0.0334, -0.0576, 0.0487, -0.0472, 0.0513, -0.0252, 0.0319, -0.045,
  0.0497, -0.032, 0.0343, -0.0449, 0.0603, -0.034, 0.057, -0.0522, 0.041,
  -0.0387, 0.0393, -0.0218, 0.044, -0.0472, 0.0986, -0.0903, 0.0416, -0.1006,
  0.0779, -0.0848, 0.0929, -0.0687, 0.0357, -0.1121, 0.08, -0.076, 0.1106,
  -0.103, 0.0898, -0.1213, 0.081, -0.1064, 0.0573, -0.0896, 0.1346, -0.1389,
  0.1908, -0.1078, 0.1028, -0.1172, 0.1148, -0.1111, 0.1023, -0.089, 0.1537,
  -0.0973, 0.1816, -0.1993, 0.1639, -0.2246, 0.1435, -0.1435, 0.1081, -0.1839,
  0.1313, -0.1122, 0.1437, -0.1517, 0.2413, -0.1795, 0.107, -0.1345, 0.1363,
  -0.1176, 0.0994, -0.1193, 0.1668, -0.1512, 0.0082, -0.1296, 0.0686, -0.0729,
  0.0779, -0.0435, 0.0752, -0.0766, 0.109, -0.0936, 0.1608, -0.0392, 0.233,
  -0.2205, 0.3387, -0.2849, 0.1594, -0.1651, 0.1925, -0.1994, 0.2049, -0.1077,
  0.0272, -0.0768, 0.0962, -0.1145, 0.0817, -0.0775, 0.1374, -0.069, 0.1337,
  -0.0965, 0.1322, -0.1002, 0.1041, -0.0645, 0.2029, -0.0895, 0.164, -0.1654,
  0.149, -0.1005, 0.1193, -0.133, 0.2598, -0.1196, 0.1132, -0.181, 0.1587,
  -0.1511, 0.0953, -0.1386, 0.0979, -0.1903, 0.2443, -0.1542, 0.2661, -0.1416,
  0.1738, -0.3136, 0.1659, -0.2384, 0.2864, -0.1778, 0.2507, -0.1897, 0.2231,
  -0.2282, 0.2931, -0.2692, 0.2759, -0.1862, 0.1552, -0.2059, 0.2208, -0.1638,
  0.1632, -0.1436, 0.2072, -0.2361, 0.1873, -0.3479, 0.2176, -0.1412, 0.2384,
  -0.1345, 0.1938, -0.2259, 0.1481, -0.1333, 0.0925, -0.1757, 0.1057, -0.149,
  0.1008, -0.1556, 0.0748, -0.1173, 0.0207, -0.0281, 0.0359, -0.0245, 0.0317,
  -0.029, 0.0471, -0.0189, 0.0234, -0.035, 0.0205, -0.0345, 0.0253, -0.0099,
  0.0204, -0.0391, 0.0264, -0.0227, 0.019, -0.0376, 0.0217, -0.0339, 0.0196,
  -0.0327, 0.0329, -0.0155, 0.0278, -0.0224, 0.0194, -0.0301, 0.0182, -0.023,
  0.0216, -0.0304, 0.0389, -0.0761, 0.1436, -0.0895, 0.0853, -0.0919, 0.1009,
  -0.0596, 0.0881, -0.1237, 0.1113, -0.0933, 0.0714, -0.0763, 0.0794, -0.0511,
  0.0304, -0.024, 0.0346, -0.0429, 0.0496, -0.0501, 0.038, -0.0343, 0.0391,
  -0.0556, 0.0224, -0.0557, 0.1149, -0.0366, 0.0866, -0.0581, 0.0932, -0.1064,
  0.1008, -0.096, 0.1, -0.049, 0.0849, -0.1088, 0.0414, -0.1101, 0.066, -0.0799,
  0.0673, -0.0787, 0.0859, -0.0766, 0.0735, -0.0636, 0.0648, -0.0426, 0.0512,
  -0.0434, 0.0954, -0.134, 0.0398, -0.0958, 0.0814, -0.0802, 0.0885, -0.0552,
  0.0859, -0.1245, 0.1259, -0.0127, 0.114, -0.0916, 0.0794, -0.0795, 0.0769,
  -0.0771, 0.0659, -0.095, 0.0835, -0.0655, 0.0897, -0.0905, 0.1061, -0.1125,
  0.0939, -0.1044, 0.1112, -0.1221, 0.0691, -0.0767, 0.0838, -0.0839, 0.0504,
  -0.082, 0.1237, -0.0747, 0.1347, -0.0976, 0.0848, -0.1045, 0.0963, -0.0871,
  0.1055, -0.1094, 0.0842, -0.2099, 0.0928, -0.1553, 0.1288, -0.1493, 0.1755,
  -0.19, 0.1369, -0.1604, 0.1933, -0.1564, 0.1586, -0.1688, 0.2833, -0.1952,
  0.2714, -0.1853, 0.5167, -0.194, 0.2511, -0.2099, 0.2069, -0.157, 0.2589,
  -0.245, 0.2125, -0.2231, 0.0679, -0.0327, 0.115, -0.0879, 0.1653, -0.1977,
  0.1211, -0.078, 0.0827, -0.0347, 0.1018, -0.1606, 0.0326, -0.046, 0.0367,
  -0.0829, 0.1086, -0.0466, 0.0359, -0.0414, 0.0303, -0.0388, 0.0318, -0.0353,
  0.0064, -0.0232, 0.0238, -0.0075, 0.0177, -0.0122, 0.0247, -0.0167, 0.026,
  -0.032, 0.0124, -0.0154, 0.031, -0.0298, 0.0339, -0.0209, 0.0468, -0.0454,
  0.038, -0.0363, 0.054, -0.0514, 0.0467, -0.0443, 0.1001, -0.0463, 0.073,
  -0.031, 0.1114, -0.0916, 0.0611, -0.1564, 0.0639, -0.0831, 0.0369, -0.0504,
  0.0567, -0.0827, 0.0551, -0.045, 0.0553, -0.0442, 0.0643, -0.0729, 0.0536,
  -0.0669, 0.0395, -0.0856, 0.0763, -0.0563, 0.0709, -0.0555, 0.0445, -0.0587,
  0.0539, -0.0459, 0.0792, -0.043, 0.0631, -0.0554, 0.077, -0.0675, 0.0513,
  -0.0947, 0.0806, -0.0352, 0.0545, -0.0396, 0.074, -0.0451, 0.0787, -0.1009,
  0.0671, -0.0901, 0.0895, -0.0876, 0.0806, -0.083, 0.0889, -0.0956, 0.0848,
  -0.062, 0.1036, -0.1244, 0.1729, -0.1411, 0.1813, -0.1082, 0.1848, -0.0801,
  0.0841, -0.1096, 0.1444, -0.1261, 0.1305, -0.2722, 0.1303, -0.101, 0.1436,
  -0.1222, 0.149, -0.1211, 0.1849, -0.1748, 0.1401, -0.1868, 0.1637, -0.2601,
  0.1771, -0.2074, 0.1411, -0.1462, 0.2447, -0.1938, 0.2491, -0.2652, 0.1911,
  -0.1715, 0.1245, -0.0715, 0.0418, -0.1009, 0.0527, -0.0678, 0.0427, -0.0809,
  0.0248, -0.0454, 0.0184, -0.0678, 0.0401, -0.0328, 0.0202, -0.0335, 0.0603,
  -0.0349, 0.0234, -0.0497, 0.0237, -0.0276, 0.0243, -0.0366, 0.0193, -0.0282,
  0.0194, -0.0118, 0.0185, -0.0313, 0.0217, -0.0261, 0.0162, -0.0325, 0.0219,
  -0.0399, 0.0323, -0.0311, 0.0223, -0.0107, 0.0401, -0.0375, 0.0566, -0.0363,
  0.0606, -0.0336, 0.0734, -0.0421, 0.083, -0.041, 0.1053, -0.0843, 0.104,
  -0.0817, 0.092, -0.102, 0.0883, -0.1262, 0.0898, -0.085, 0.1523, -0.1133,
  0.1141, -0.1363, 0.1476, -0.1121, 0.0544, -0.0899, 0.1078, -0.1234, 0.0573,
  -0.0397, 0.0417, -0.038, 0.0227, -0.0238, 0.0393, -0.0644, 0.0271, -0.0385,
  0.0297, -0.0182, 0.0247, -0.0406, 0.0307, -0.0544, 0.0304, -0.0372, 0.0423,
  -0.0378, 0.0499, -0.0326, 0.0169, -0.0242, 0.0601, -0.0595, 0.0342, -0.0409,
  0.0312, -0.0352, 0.0433, -0.0622, 0.0275, -0.023, 0.0364, -0.0359, 0.059,
  -0.0393, 0.0704, -0.0674, 0.0323, -0.0512, 0.0874, -0.0731, 0.1386, -0.1028,
  0.0507, -0.0794, 0.1593, -0.1041, 0.2248, -0.1476, 0.251, -0.2503, 0.2528,
  -0.3268, 0.1877, -0.2325, 0.2298, -0.1778, 0.2199, -0.3063, 0.2315, -0.1841,
  0.2411, -0.2177, 0.3627, -0.2132, 0.2901, -0.2417, 0.2113, -0.2216, 0.2665,
  -0.2414, 0.3869, -0.422, 0.2249, -0.2073, 0.2269, -0.2073, 0.1953, -0.2972,
  0.3386, -0.3203, 0.2349, -0.256, 0.171, -0.2371, 0.0787, -0.0506, 0.0569,
  -0.0586, 0.0415, -0.0435, 0.026, -0.0328, 0.022, -0.041, 0.047, -0.0344,
  0.0358, -0.0465, 0.0436, -0.0617, 0.0416, -0.0394, 0.044, -0.0483, 0.0497,
  -0.0346, 0.0959, -0.07, 0.0287, -0.0517, 0.0256, -0.0236, 0.0124, -0.0138,
  0.0244, -0.0183, 0.0093, -0.016, 0.0137, -0.0132, 0.0102, -0.0094, 0.0082,
  -0.0085, 0.0073, -0.0065, 0.03, -0.0489, 0.0396, -0.0346, 0.0346, -0.0424,
  0.0391, -0.0253, 0.0397, -0.0625, 0.085, -0.0571, 0.1055, -0.0501, 0.0968,
  -0.1019, 0.1334, -0.1113, 0.0767, -0.0554, 0.1423, -0.0804, 0.1024, -0.062,
  0.0821, -0.0789, 0.0306, -0.0792, 0.0324, -0.0346, 0.0578, -0.0464, 0.0557,
  -0.0276, 0.0398, -0.0562, 0.0452, -0.0282, 0.0435, -0.0464, 0.0459, -0.0238,
  0.0184, -0.0254, 0.0325, -0.0377, 0.0029, -0.0506, 0.0284, -0.0167, 0.027,
  -0.0239, 0.0234, -0.0285, 0.0275, -0.0257, 0.0245, -0.0195, 0.0397, -0.0295,
  0.0319, -0.0325, 0.0341, -0.0449, 0.0285, -0.0322, 0.0867, -0.0682, 0.0605,
  -0.0774, 0.1007, -0.1065, 0.3052, -0.1299, 0.2391, -0.1524, 0.2651, -0.1667,
  0.1221, -0.1549, 0.1088, -0.2574, 0.2571, -0.2537, 0.1109, -0.1588, 0.2623,
  -0.1542, 0.2983, -0.2171, 0.1256, -0.1709, 0.2885, -0.16, 0.1351, -0.166,
  0.1195, -0.1552, 0.1581, -0.1543, 0.2096, -0.167, 0.2243, -0.1476, 0.127,
  -0.136, 0.2994, -0.1596, 0.2158, -0.2584, 0.237, -0.2385, 0.3485, -0.2457,
  0.2449, -0.1757, 0.2493, -0.2016, 0.313, -0.1765, 0.2301, -0.1532, 0.2907,
  -0.1311, 0.0605, -0.0778, 0.0516, -0.0951, 0.0084, -0.0099, 0.0138, -0.0192,
  0.0234, -0.0452, 0.0389, -0.0401, 0.049, -0.1333, 0.0728, -0.1111, 0.0423,
  -0.063, 0.0201, -0.0034, 0.0179, -0.0249, 0.0277, -0.023, 0.1229, -0.0712,
  0.0695, -0.1024, 0.0425, -0.0809, 0.0951, -0.0102, 0.0721, -0.0537, 0.1316,
  -0.0321, 0.0384, -0.0751, 0.052, -0.0432, 0.0572, -0.1246, 0.0166, -0.021,
  0.017, -0.0107, 0.0086, -0.0107, 0.0116, -0.0129, 0.0168, -0.0224, 0.0167,
  -0.0212, 0.0218, -0.0461, 0.0436, -0.0618, 0.033, -0.0307, 0.0348, -0.0322,
  0.0481, -0.0348, 0.0865, -0.0382, 0.0343, -0.0286, 0.0448, -0.0405, 0.0442,
  -0.0333, 0.0615, -0.0273, 0.0633, -0.0338, 0.0513, -0.0296, 0.0612, -0.0559,
  0.0464, -0.0206, 0.0292, -0.086, 0.0186, -0.0387, 0.0369, -0.0551, 0.0437,
  -0.0686, 0.0743, -0.0278, 0.054, -0.1107, 0.0703, -0.073, 0.0743, -0.0462,
  0.0401, -0.0891, 0.0705, -0.0661, 0.1006, -0.0897, 0.0746, -0.1141, 0.059,
  -0.0608, 0.0665, -0.056, 0.0492, -0.077, 0.0629, -0.0846, 0.0881, -0.05,
  0.1123, -0.0566, 0.1142, -0.2227, 0.1595, -0.0698, 0.117, -0.0854, 0.1593,
  -0.1921, 0.1426, -0.0957, 0.1401, -0.1477, 0.1359, -0.1059, 0.1876, -0.1587,
  0.0857, -0.064, 0.2203, -0.1034, 0.186, -0.1846, 0.1866, -0.1048, 0.1192,
  -0.1089, 0.1279, -0.1847, 0.2078, -0.139, 0.0297, -0.0712, 0.0652, -0.1118,
  0.0787, -0.1525, 0.0567, -0.0796, 0.0647, -0.0611, 0.1166, -0.3055, 0.2725,
  -0.1902, 0.1524, -0.0955, 0.1391, -0.1977, 0.1609, -0.2122, 0.0269, -0.2375,
  0.0945, -0.0431, 0.0827, -0.0935, 0.0918, -0.0971, 0.0606, -0.0652, 0.0558,
  -0.0525, 0.0829, -0.1117, 0.0962, -0.0959, 0.0749, -0.17, 0.0682, -0.0982,
  0.1469, -0.1184, 0.0769, -0.1162, 0.1939, -0.1292, 0.124, -0.1763, 0.2498,
  -0.2058, 0.0802, -0.125, 0.1396, -0.0916, 0.0993, -0.172, 0.191, -0.1198,
  0.0244, -0.0183, 0.0093, -0.016, 0.0137, -0.0132, 0.0102, -0.0094, 0.0082,
  -0.0085, 0.0073, -0.0065, 0.03, -0.0489, 0.0396, -0.0346, 0.0346, -0.0424,
  0.0391, -0.0253, 0.0397, -0.0625, 0.085, -0.0571, 0.1055, -0.0501, 0.0968,
  -0.1019, 0.1334, -0.1113, 0.0767, -0.0554, 0.1423, -0.0804, 0.1024, -0.062,
  0.0821, -0.0789, 0.0306, -0.0792, 0.0324, -0.0346, 0.0578, -0.0464, 0.0557,
  -0.0276, 0.0398, -0.0562, 0.0452, -0.0282, 0.0435, -0.0464, 0.0459, -0.0238,
  0.0184, -0.0254, 0.0325, -0.0377, 0.0029, -0.0506, 0.0284, -0.0167, 0.027,
  -0.0239, 0.0234, -0.0285, 0.0275, -0.0257, 0.0245, -0.0195, 0.0397, -0.0295,
  0.0319, -0.0325, 0.0341, -0.0449, 0.0285, -0.0322, 0.0867, -0.0682, 0.0605,
  -0.0774, 0.1007, -0.1065, 0.3052, -0.1299, 0.2391, -0.1524, 0.2651, -0.1667,
  0.1221, -0.1549, 0.1088, -0.2574, 0.2571, -0.2537, 0.1109, -0.1588, 0.2623,
  -0.1542, 0.2983, -0.2171, 0.1256, -0.1709, 0.2885, -0.16, 0.1351, -0.166,
  0.0244, -0.0183, 0.0093, -0.016, 0.0137, -0.0132, 0.0102, -0.0094, 0.0082,
  -0.0085, 0.0073, -0.0065, 0.03, -0.0489, 0.0396, -0.0346, 0.0346, -0.0424,
  0.0391, -0.0253, 0.0397, -0.0625, 0.085, -0.0571, 0.1055, -0.0501, 0.0968,
  -0.1019, 0.1334, -0.1113, 0.0767, -0.0554, 0.1423, -0.0804, 0.1024, -0.062,
  0.0821, -0.0789, 0.0306, -0.0792, 0.0324, -0.0346, 0.0578, -0.0464, 0.0557,
  -0.0276, 0.0398, -0.0562, 0.0452, -0.0282, 0.0435, -0.0464, 0.0459, -0.0238,
  0.0184, -0.0254, 0.0325, -0.0377, 0.0029, -0.0506, 0.0284, -0.0167, 0.027,
  -0.0239, 0.0234, -0.0285, 0.0275, -0.0257, 0.0245, -0.0195, 0.0397, -0.0295,
  0.0319, -0.0325, 0.0341, -0.0449, 0.0285, -0.0322, 0.0867, -0.0682, 0.0605,
  -0.0774, 0.1007, -0.1065, 0.3052, -0.1299, 0.2391, -0.1524, 0.2651, -0.1667,
  0.1221, -0.1549, 0.1088, -0.2574, 0.2571, -0.2537, 0.1109, -0.1588, 0.2623,
  -0.1542, 0.2983, -0.2171, 0.1256, -0.1709, 0.2885, -0.16, 0.1351, -0.166,
]

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: 'white',
  progressColor: '#8E65FF',
  cursorColor: '#8E65FF',
  responsive: true,
  height: 40,
  pixelRatio: 1,
  barWidth: 2,
  barGap: 4,
  backend: 'MediaElement',
})

export const AudioPlayer = ({
  url,
  play = false,
  name,
  className = '',
  creatorName,
  trackPictureUrl,
  creatorEthAddress,
  id,
  contractAddress,
  nftType,
}: AudioPlayerProps) => {
  const waveformRef = useRef(null)
  const wavesurfer = useRef(null)
  const WavesurferLibrary = useRef(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { setCurrentTrack, currentTrack } = useAudioContext()

  useEffect(() => {
    if (!url) {
      return
    }
    create(url)
    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy()
      }
    }
  }, [])

  useEffect(() => {
    if (!wavesurfer.current) {
      return
    }
    if (wavesurfer.current.isReady) {
      if (play) {
        wavesurfer.current.setMute(true)
        wavesurfer.current.play()
      } else if (wavesurfer.current.isPlaying()) {
        wavesurfer.current.pause()
      }
    }
  }, [play, wavesurfer.current])

  const create = async (url: string) => {
    if (!WavesurferLibrary.current) {
      WavesurferLibrary.current = await (await import('wavesurfer.js')).default
    }
    const options = formWaveSurferOptions(waveformRef.current)
    wavesurfer.current = WavesurferLibrary.current.create(options)

    try {
      wavesurfer.current.load(url, pcmData)
    } catch (e) {
      console.log(e)
    }

    // wavesurfer.current.on('loading', function (progress) {
    //   if (progress < 100 && !isLoading) {
    //     setIsLoading(true)
    //   } else if (progress === 100) {
    //     setIsLoading(false)
    //   }
    // })
    wavesurfer.current.on('seek', function (seek) {
      setCurrentTrack({
        url,
        trackName: name,
        currentPosition: seek,
        creatorName,
        trackPictureUrl,
        creatorEthAddress,
        id,
        contractAddress,
        isPlaying: true,
        play: true,
        nftType,
      })
    })
  }

  return (
    <div className={cn(className)}>
      <div className={isLoading ? 'hidden' : 'block'} ref={waveformRef} />
      {isLoading && (
        <div className={cn('flex self-center items-center justify-center p-3')}>
          <Bars color="#7A64FF" height={25} width={25} />
        </div>
      )}
    </div>
  )
}
