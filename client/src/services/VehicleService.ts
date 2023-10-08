import HttpClient from './HttpClient'

enum VehicleEndpoints {
  ADD_VEHICLE = '/vehicle/add',
  GET_ALL_VEHICLE = '/vehicle/get-all',
}

type FormDataType = Record<string, string | number | FormData | null | string[]>

class VehicleService extends HttpClient {
  static async addVehicle(body: FormDataType, token: string) {
    const { data, errors } = await this.post(VehicleEndpoints.ADD_VEHICLE, body, {
      ...(token && { authorization: `Bearer ${token}` }),
    })
    return { data, errors }
  }

  static async getAllVehicle(token: string) {
    const { data, errors } = await this.get(VehicleEndpoints.GET_ALL_VEHICLE, {
      ...(token && { authorization: `Bearer ${token}` }),
    })
    return { data, errors }
  }
}

export default VehicleService
