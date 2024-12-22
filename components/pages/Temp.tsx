import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButtons,
  IonMenuButton,
} from '@ionic/react';
import {
  personOutline,
  documentTextOutline,
  cardOutline,
  checkmarkDoneOutline,
  bookOutline,
  notificationsOutline,
  analyticsOutline,
  calendarOutline,
  moonOutline,
  sunnyOutline,
} from 'ionicons/icons';
import Link from 'next/link';
import Notifications from './Notifications';
import Store from '../../store';
import { selectHomeItems } from '../../store/selectors';

const HomePage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const studentStats = {
    totalStudents: 500,
    presentToday: 450,
    absentToday: 50,
    upcomingExams: 3,
  };

  const menuItems = [
    {
      title: 'Attendance',
      icon: checkmarkDoneOutline,
      route: '/attendance',
      description: 'Track student presence',
      darkBgColor: 'bg-blue-900',
      lightBgColor: 'bg-blue-100',
      darkTextColor: 'text-blue-200',
      lightTextColor: 'text-blue-800',
    },
    {
      title: 'Examination',
      icon: documentTextOutline,
      route: '/examination',
      description: 'Manage exam schedules',
      darkBgColor: 'bg-green-900',
      lightBgColor: 'bg-green-100',
      darkTextColor: 'text-green-200',
      lightTextColor: 'text-green-800',
    },
    {
      title: 'Fee Management',
      icon: cardOutline,
      route: '/fees',
      description: 'Financial transactions',
      darkBgColor: 'bg-purple-900',
      lightBgColor: 'bg-purple-100',
      darkTextColor: 'text-purple-200',
      lightTextColor: 'text-purple-800',
    },
    {
      title: 'Student Profile',
      icon: personOutline,
      route: '/profile',
      description: 'Personal student info',
      darkBgColor: 'bg-pink-900',
      lightBgColor: 'bg-pink-100',
      darkTextColor: 'text-pink-200',
      lightTextColor: 'text-pink-800',
    },
    {
      title: 'Academic Calendar',
      icon: calendarOutline,
      route: '/calendar',
      description: 'Important dates',
      darkBgColor: 'bg-yellow-900',
      lightBgColor: 'bg-yellow-100',
      darkTextColor: 'text-yellow-200',
      lightTextColor: 'text-yellow-800',
    },
    {
      title: 'Course Management',
      icon: bookOutline,
      route: '/courses',
      description: 'Course details',
      darkBgColor: 'bg-indigo-900',
      lightBgColor: 'bg-indigo-100',
      darkTextColor: 'text-indigo-200',
      lightTextColor: 'text-indigo-800',
    },
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const homeItems = Store.useState(selectHomeItems);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <IonPage className={isDarkMode ? 'dark' : ''}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Student Management</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={toggleDarkMode}>
              <IonIcon icon={isDarkMode ? sunnyOutline : moonOutline} />
            </IonButton>
            <IonButton onClick={() => setShowNotifications(true)}>
              <IonIcon icon={notificationsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent
        className={`ion-padding ${
          isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
        }`}
        fullscreen
      >
        <IonHeader collapse="condense">
          <IonToolbar>
            <h3  className='text-2xl text-left font-bold'>Student Management</h3>
          </IonToolbar>
        </IonHeader>
        {/* Statistics Overview */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {Object.entries(studentStats).map(([key, value]) => (
            <div
              key={key}
              className={`
                ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}
                shadow-md rounded-lg p-4 text-center 
                transform transition-all hover:scale-105
              `}
            >
              <h3
                className={`
                text-sm 
                ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} 
                mb-2
              `}
              >
                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
              </h3>
              <p
                className={`text-2xl font-bold ${
                  isDarkMode ? 'text-blue-300' : 'text-blue-700'
                }`}
              >
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Action Tiles */}
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map(item => (
            <Link href={item.route} key={item.title} passHref>
              <div
                className={`
                  ${
                    isDarkMode
                      ? `${item.darkBgColor} ${item.darkTextColor}`
                      : `${item.lightBgColor} ${item.lightTextColor}`
                  } 
                  rounded-xl p-4 shadow-md hover:shadow-xl transition-all
                `}
              >
                <div className="flex items-center mb-3">
                  <IonIcon icon={item.icon} className="text-2xl mr-3" />
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                </div>
                <p className="text-xs opacity-75">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <Notifications
          open={showNotifications}
          onDidDismiss={() => setShowNotifications(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
