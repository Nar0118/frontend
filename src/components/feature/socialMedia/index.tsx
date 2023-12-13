
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faViber, faTiktok } from '@fortawesome/free-brands-svg-icons';

import styles from './socialMedia.module.scss';

const SocialMedia = () =>
    <>
        <div className={styles.wrapper}>
            <ul className={styles.ul}>
                <li className={styles.facebook}>
                    <a href="https://www.facebook.com/bbest.am" target='_blank' rel="noreferrer">
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                        <div className={styles.slider}>
                            <p>facebook</p>
                        </div>
                    </a>
                </li>
                {/* <li className={styles.twitter}>
                    <i className="fa fa-twitter" aria-hidden="true"></i>
                    <div className={styles.slider}>
                        <p>twitter</p>
                    </div>
                </li> */}
                <li className={styles.instagram}>
                    <a href="https://instagram.com/best__technologies?igshid=NGVhN2U2NjQ0Yg==" target='_blank' rel="noreferrer">
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                        <div className={styles.slider}>
                            <p>instagram</p>
                        </div>
                    </a>
                </li>
                {/* <li className={styles.google}>
                    <i className="fa fa-google" aria-hidden="true"></i>
                    <div className={styles.slider}>
                        <p>google</p>
                    </div>
                </li> */}
                <li className={styles.whatsapp}>
                    <a href="whatsapp://send?phone=+37496424643">
                        <i className="fa fa-whatsapp" aria-hidden="true"></i>
                        <div className={styles.slider}>
                            <p>whatsapp</p>
                        </div>
                    </a>
                </li>
                <li className={styles.viber}>
                    <a href="viber://chat?number=+37496424643">
                        <FontAwesomeIcon icon={faViber} color='#fff' />
                        <div className={styles.slider}>
                            <p>viber</p>
                        </div>
                    </a>
                </li>
                <li className={styles.tiktok}>
                    <a href="https://www.tiktok.com/@best_systems" target='_blank' rel="noreferrer">
                        <FontAwesomeIcon icon={faTiktok} color='#fff' />
                        <div className={styles.slider}>
                            <p>tiktok</p>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </>

export default SocialMedia;
