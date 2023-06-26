import styles from './styles.module.scss';

import { Accordion, AccordionItem as Item } from '@/ui/Accordion';

export default function FAQPage () {
    return <div className={styles.wrapper}>
        <div className={styles.faq}>
            <div className={styles.header}>
                <h1>Вопросы-ответы</h1>
            </div>
            <Accordion>
                <Item
                    title={'Что такое Билетопоиск?'}
                    content={'Мы — крупнейший сервис о кино в рунете. На нем вы сможете посмотреть фильмы и сериалы, купить билеты в кино, узнать рейтинги популярных видео и интересные факты, поставить фильмам оценки, написать рецензии и дополнить описание фильмов.'}
                />
                <Item
                    title={'Какой компании принадлежит Билетопоиск?'}
                    content={'Плейсхолдер'}
                />
                <Item
                    title={'Как купить билет на Билетопоиск?'}
                    content={'Плейсхолдер'}
                />
                <Item
                    title={'Как оставить отзыв на Билетопоиск?'}
                    content={'Плейсхолдер'}
                />
            </Accordion>
        </div>
    </div>
}