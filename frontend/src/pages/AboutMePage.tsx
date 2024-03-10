import profile from '../assets/profile.jpg';
import curriculum from '../assets/curriculum.pdf';
import styles from '../styles/AboutMe.module.css';
import { Button } from "react-bootstrap";

const AboutMe = () => {
    return ( 
        <section className={styles.profile}>
            <article className={styles.picContainer}>
                <img src={profile} alt="Mateo Profile"
                className={styles.profilePic} width={400} height={400}/>
            </article>
            <article className={styles.profileText}>
                <p className={styles.textP1}>Hello I'm</p>
                <h1 className={styles.title}>Mateo Buraschi</h1>
                <p className={styles.textP2}>FullStack Developer</p>
                <div className={styles.btnContainer}>
                <a href={curriculum} target="_blank"
                rel="noreferrer">
                    <Button className={`mb-4 `}>
                        Download CV
                    </Button>
                </a>
                </div>
            </article>
        </section>
     );
}
 
export default AboutMe;