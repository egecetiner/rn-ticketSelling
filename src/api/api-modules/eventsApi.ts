import auth from '@react-native-firebase/auth';
import {AppError} from '../../utils/error-handling/AppError';
import {
  ErrorResult,
  Result,
  SuccessResult,
} from '../../utils/error-handling/Result';
import {API} from '../Api';

type PopulatableField = 'id';

type PopulateOptions = PopulatableField[];

function getPopulateQueryVariables(fields: PopulateOptions): string {
  if (fields.length === 0) {
    return '';
  } else {
    return fields
      .map((f) => {
        return `populate[]=${f}`;
      })
      .join('&');
  }
}

class eventsApi {
  api: API;
  private endpoint: string;

  constructor(api: API) {
    this.api = api;
    this.endpoint = api.constants.eventsEndpoint;
  }

  async addEvent(
    title: string,
    description: string,
    date: any,
    mekan: string,
    city: string,
    program: any,
    biletler: any,
    personals: any,
    notlar: string,
    eventImage: string,
  ): Promise<SuccessResult<any> | ErrorResult<AppError>> {
    await this.api.users
      .getUser(await auth().currentUser.uid)
      .then(async (data) => {
        if (data.value.isAdmin) {
          const reqResult = await this.api.makeRequest<any>(
            this.api.client.post(this.endpoint, {
              title: title,
              description: description,
              date: date,
              mekan: mekan,
              program: program,
              biletler: biletler,
              personals: personals,
              city: city,
              notlar: notlar,
              eventImage: eventImage,
            }),
            `Error while adding event '${title}'  to the server`,
          );

          if (Result.isSuccess(reqResult)) {
            return Result.ok(reqResult.value.data);
          } else {
            return reqResult;
          }
        }
      });
  }

  async getAllEvents(
    params?: any,
    fieldsToPopulate: PopulateOptions = [],
  ): Promise<SuccessResult<any> | ErrorResult<AppError>> {
    const reqResult = await this.api.makeRequest<any>(
      this.api.client.get(
        this.endpoint + '?' + getPopulateQueryVariables(fieldsToPopulate),
        {
          params,
        },
      ),
      `Error while fetching events from API`,
    );

    if (Result.isSuccess(reqResult)) {
      const events = reqResult.value;

      return Result.ok(events);
    } else {
      // Error handling
      if (reqResult.error.code === 'server-failed-request') {
        const apiError = reqResult.error;

        if (apiError.htmlCode === 404) {
          return Result.fail<any>({
            ...reqResult.error,
            errorMsg: `There is no user`,
            code: 'resource-not-found',
          });
        } else {
          return reqResult;
        }
      }
      return reqResult;
    }
  }

  async deleteEvent(
    id: string,
  ): Promise<SuccessResult<any> | ErrorResult<AppError>> {
    await this.api.users
      .getUser(await auth().currentUser.uid)
      .then(async (data) => {
        if (data.value.isAdmin) {
          if (id.trim() === '' || id.trim().length < 2) {
            return Result.fail<AppError>({
              errorMsg: 'Event ID is empty',
              code: 'bad-format',
            });
          }

          const response = await this.api.events.getAllEvents({
            id: id,
          });

          await response.value[0].personals.map(async (x: any) => {
            await this.api.users
              .getAllUsers({phoneNumber: x.split('-')[0]})
              .then(async (data) => {
                let id1 = data.value[0].id;
                let name = data.value[0].name;
                let mail = data.value[0].mail;
                let city = data.value[0].city;
                let adress = data.value[0].adress;
                let identityNumber = data.value[0].identityNumber;
                let isPersonal = data.value[0].isPersonal.filter((x) => {
                  return x !== id;
                });

                await this.api.users.updateUser(
                  id1,
                  name,
                  mail,
                  city,
                  adress,
                  identityNumber,
                  isPersonal,
                );
              });
          });

          await this.api.tickets
            .getAllTickets({
              eventId: id,
            })
            .then(async (data1) => {
              console.log('data1', data1.value);
              await Promise.all(
                await data1.value.map(async (ticket) => {
                  console.log('ticket', ticket);
                  await this.api.makeRequest<any>(
                    this.api.client.delete('/tickets' + `/${ticket.id}`),
                    `Error while deleting ticket ID '${ticket.id}' from API`,
                  );
                }),
              );
            });

          const reqResult = await this.api.makeRequest<any>(
            this.api.client.delete(this.endpoint + `/${id}`),
            `Error while deleting event ID '${id}' from API`,
          );

          if (Result.isSuccess(reqResult)) {
            const event = reqResult.value;

            return Result.ok(event);
          } else {
            // Error handling
            if (reqResult.error.code === 'server-failed-request') {
              const apiError = reqResult.error;

              if (apiError.htmlCode === 404) {
                return Result.fail<any>({
                  ...reqResult.error,
                  errorMsg: `No event with ID '${id}' was found`,
                  code: 'resource-not-found',
                });
              } else {
                return reqResult;
              }
            }
            return reqResult;
          }
        }
      });
  }
  async updateEvent(
    id: string,
    title: string,
    description: string,
    date: any,
    mekan: string,
    city: string,
    program: any,
    biletler: any,
    personals: any,
    notlar: string,
    eventImage: string,
  ): Promise<SuccessResult<any> | ErrorResult<AppError>> {
    await this.api.users
      .getUser(await auth().currentUser.uid)
      .then(async (data) => {
        if (data.value.isAdmin) {
          const reqResult = await this.api.makeRequest<any>(
            this.api.client.put(this.endpoint + `/${id}`, {
              title: title,
              description: description,
              date: date,
              mekan: mekan,
              program: program,
              biletler: biletler,
              personals: personals,
              city: city,
              notlar: notlar,
              eventImage: eventImage,
            }),
            `Error while updating event '${title}' to the server`,
          );

          if (Result.isSuccess(reqResult)) {
            return Result.ok(reqResult.value.data);
          } else {
            return reqResult;
          }
        }
      });
  }
}

export default eventsApi;
