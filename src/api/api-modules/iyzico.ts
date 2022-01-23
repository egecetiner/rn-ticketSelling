import auth from '@react-native-firebase/auth';
import {userStore} from '../../stores/userStore';
import {Result} from '../../utils/error-handling/Result';
import {API} from '../Api';

class paymentApi {
  api: API;

  private endpoint: string;

  constructor(api: API) {
    this.api = api;
    this.endpoint = api.constants.paymentEndpoint;
  }

  async payment(price: number, chosenTicket: number, eventId: string) {
    const user = await auth().currentUser;

    const nameArray = userStore.name.split(' ');
    const surname = nameArray.pop();
    const name = nameArray.join(' ');

    const reqResult = await this.api.makeRequest<any>(
      this.api.client.post(
        this.endpoint + `/form/${user.uid}/${eventId}`,
        {
          buyerIp: userStore.ip,
          buyerCity: userStore.city,
          buyerAdress: userStore.adress,
          buyerIdentityNumber: userStore.identityNumber,
          buyerMail: userStore.mail,
          buyerName: name,
          buyerSurname: surname,
          buyerPhoneNumber: user?.phoneNumber,
          price: price,
          paidPrice: price,
          chosenTicket: chosenTicket,
        },
      ),
      `Error while payment`,
    );

    if (Result.isSuccess(reqResult)) {
      return Result.ok(reqResult.value);
    } else {
      return reqResult;
    }
  }
}

export default paymentApi;
