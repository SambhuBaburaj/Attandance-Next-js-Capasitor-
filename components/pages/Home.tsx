import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonButtons,
  IonMenuButton,
  IonRouterLink,
} from '@ionic/react';
import {
  personOutline,
  documentTextOutline,
  cardOutline,
  checkmarkDoneOutline,
  bookOutline,
  notificationsOutline,
  calendarOutline,
  moonOutline,
  sunnyOutline,
} from 'ionicons/icons';
import Notifications from './Notifications';
import Store from '../../store';
import { selectHomeItems } from '../../store/selectors';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const router = useRouter();
  const homeItems = Store.useState(selectHomeItems);

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
      title: 'Teacher Management',
      icon: bookOutline,
      route: '/admin/teacher-list',
      description: 'Course details',
      darkBgColor: 'bg-indigo-900',
      lightBgColor: 'bg-indigo-100',
      darkTextColor: 'text-indigo-200',
      lightTextColor: 'text-indigo-800',
    },
  ];

  return (
    <IonPage className={isDarkMode ? 'dark' : ''}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Student Management</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsDarkMode(!isDarkMode)}>
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
            <h3 className="text-2xl font-bold">Student Management</h3>
          </IonToolbar>
        </IonHeader>

        {/* Statistics Overview with fixed heights */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {Object.entries(studentStats).map(([key, value]) => (
            <div
              key={key}
              className={`
                ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}
                shadow-md rounded-lg p-4 text-center
                transform transition-all hover:scale-105
                h-32 flex flex-col justify-center items-center
              `}
            >
              <h3
                className={`
                  text-sm
                  ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                  mb-2 capitalize
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

        {/* Quick Action Tiles with fixed heights */}
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map(item => (
            <IonRouterLink
              routerLink={item.route}
              key={item.title}
              className="block h-full"
            >
              <div
                className={`
                  ${
                    isDarkMode
                      ? `${item.darkBgColor} ${item.darkTextColor}`
                      : `${item.lightBgColor} ${item.lightTextColor}`
                  }
                  rounded-xl p-4 shadow-md hover:shadow-xl transition-all
                  h-32 flex flex-col justify-between
                `}
              >
                <div className="flex items-center">
                  <h3 className="font-semibold text-lg text-wrap">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs opacity-75 text-wrap">
                  {item.description}
                </p>
              </div>
            </IonRouterLink>
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
