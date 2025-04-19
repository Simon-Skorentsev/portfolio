import Contact from '@/components/contact/contact';
import Experience from '@/components/experience/experience';
import MeetMe from '@/components/meetMe/meetMe';
import Skills from '@/components/skills/skills';

import styles from './page.module.scss';

export default function Home() {
    return (
        <div className={styles.page}>
            <main>
                <MeetMe />
                <Skills />
                <Experience />
                <Contact />
            </main>
        </div>
    );
}
