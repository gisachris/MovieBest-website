import _ from 'lodash';
import './sass/styles.scss';
import logo from '../assets/images/logoDone.png';
import './modules/retrieve.js';
import './modules/display.js';
import './modules/createID.js';

const logoImage = document.querySelector('.logo');
logoImage.src = logo;