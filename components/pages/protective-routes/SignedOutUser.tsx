import { IonContent, IonPage, IonText } from '@ionic/react';

const UnauthorizedPage = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonText color="danger">
          <h2>Unauthorized Access</h2>
          <p>You don&#39;t have permission to access this page.</p>

        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default UnauthorizedPage;
