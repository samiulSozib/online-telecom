// import axios from "axios";
// import { Dispatch } from "redux";

// import {
//     FETCH_RESELLERS_REQUEST,
//     FETCH_RESELLERS_SUCCESS,
//     FETCH_RESELLERS_FAIL,
//     ADD_RESELLER_REQUEST,
//     ADD_RESELLER_SUCCESS,
//     ADD_RESELLER_FAIL,
//     EDIT_RESELLER_REQUEST,
//     EDIT_RESELLER_SUCCESS,
//     EDIT_RESELLER_FAIL,
//     DELETE_RESELLER_REQUEST,
//     DELETE_RESELLER_SUCCESS,
//     DELETE_RESELLER_FAIL,
//     CHANGE_RESELLER_STATUS_REQUEST,
//     CHANGE_RESELLER_STATUS_SUCCESS,
//     CHANGE_RESELLER_STATUS_FAIL,
//     GET_RESELLER_BY_ID_REQUEST,
//     GET_RESELLER_BY_ID_SUCCESS,
//     GET_RESELLER_BY_ID_FAIL,
//     CHANGE_RESELLER_PASSWORD_REQUEST,
//     CHANGE_RESELLER_PASSWORD_SUCCESS,
//     CHANGE_RESELLER_PASSWORD_FAIL,
//     CHANGE_RESELLER_PIN_REQUEST,
//     CHANGE_RESELLER_PIN_SUCCESS,
//     CHANGE_RESELLER_PIN_FAIL,
// } from "../constants/resellerConstants";
// import { Toast } from "primereact/toast";
// import { Reseller } from "@/types/interface";
// import Swal from "sweetalert2";

// const getAuthToken = () => {
//     return localStorage.getItem("api_token") || ""; // Fetch token from localStorage
// };

// // Fetch Resellers
// export const _fetchResellers = (page: number = 1,search:string='') => async (dispatch: Dispatch) => {
//     dispatch({ type: FETCH_RESELLERS_REQUEST });

//     try {
//         const token = getAuthToken();
//         const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/resellers?page=${page}&search=${search}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         dispatch({ type: FETCH_RESELLERS_SUCCESS, payload:
//             {
//                 data:response.data.data.resellers,
//                 pagination: response.data.payload.pagination,
//             }
//      });
//     } catch (error: any) {
//         dispatch({ type: FETCH_RESELLERS_FAIL, payload: error.message });
//     }
// };

// // Add Reseller
// export const _addReseller = (resellerData: Reseller,toast: React.RefObject<Toast>) => async (dispatch: Dispatch) => {
//     dispatch({ type: ADD_RESELLER_REQUEST });

//     try {
//         const token = getAuthToken();
//         const formData = new FormData();


//         formData.append('reseller_name', resellerData.reseller_name);
//         formData.append('contact_name', resellerData.contact_name);
//         formData.append('email', resellerData.email);
//         formData.append('phone', resellerData.phone);
//         formData.append('password', resellerData.account_password);
//         formData.append('country_id', String(resellerData.country_id));
//         formData.append('province_id', String(resellerData.province_id));
//         formData.append('districts_id', String(resellerData.districts_id));
//         formData.append('currency_preference_id', resellerData.code.toString());
//         formData.append('balance',resellerData.balance.toString());
//         formData.append('reseller_group_id',String(resellerData.reseller_group_id));
//         formData.append('can_create_sub_resellers',resellerData.can_create_sub_resellers.toString());
//         formData.append('sub_reseller_limit',resellerData.sub_reseller_limit.toString());
//         formData.append('sub_resellers_can_create_sub_resellers',resellerData.sub_resellers_can_create_sub_resellers.toString())

//         if (resellerData.profile_image_url && typeof resellerData.profile_image_url !== 'string') {
//             formData.append('profile_image_url', resellerData.profile_image_url);
//         }

//         // formData.forEach((value, key) => {
//         //     console.log(key, value);
//         // });
//         const response = await axios.post(
//             `${process.env.NEXT_PUBLIC_BASE_URL}/resellers`,
//             formData,
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'multipart/form-data',
//                 },
//             }
//         );
//         //console.log(response)
//         const newData={...resellerData,id:response.data.data.reseller.id}
//         dispatch({ type: ADD_RESELLER_SUCCESS, payload: newData });
//         toast.current?.show({
//             severity: "success",
//             summary: "Successful",
//             detail: "Reseller added",
//             life: 3000,
//           });
//     } catch (error: any) {
//         //console.log(error)
//         dispatch({ type: ADD_RESELLER_FAIL, payload: error.message });
//         toast.current?.show({
//             severity: "error",
//             summary: "Error",
//             detail: "Reseller added fail",
//             life: 3000,
//           });
//     }
// };

// // Edit Reseller
// export const _editReseller = (id: number, resellerData: Reseller,toast: React.RefObject<Toast>) => async (dispatch: Dispatch) => {
//     dispatch({ type: EDIT_RESELLER_REQUEST });

//     try {
//         const token = getAuthToken();
//         const formData = new FormData();

//         formData.append('reseller_name', resellerData.reseller_name);
//         formData.append('contact_name', resellerData.contact_name);
//         formData.append('email', resellerData.email);
//         formData.append('phone', resellerData.phone);
//         formData.append('password', resellerData.account_password);
//         formData.append('country_id', String(resellerData.country_id));
//         formData.append('province_id', String(resellerData.province_id));
//         formData.append('districts_id', String(resellerData.districts_id));
//         formData.append('currency_preference_id', resellerData.code.toString());
//         formData.append('balance',resellerData.balance.toString());
//         formData.append('reseller_group_id',String(resellerData.reseller_group_id));
//         formData.append('can_create_sub_resellers',resellerData.can_create_sub_resellers.toString());
//         formData.append('sub_reseller_limit',resellerData.sub_reseller_limit.toString());
//         formData.append('sub_resellers_can_create_sub_resellers',resellerData.sub_resellers_can_create_sub_resellers.toString())
//         formData.append('is_reseller_verified',resellerData.is_reseller_verified.toString())
//         formData.append('status',resellerData.status.toString())
//         formData.append('loan_balance',resellerData.loan_balance)
//         formData.append('total_payments_received',resellerData.total_payments_received)
//         formData.append('total_balance_sent',resellerData.total_balance_sent)

//         if (resellerData.profile_image_url && typeof resellerData.profile_image_url !== 'string') {
//             formData.append('profile_image_url', resellerData.profile_image_url);
//         }
//         //return
//         const response = await axios.post(
//             `${process.env.NEXT_PUBLIC_BASE_URL}/resellers/${id}`,
//             formData,
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'multipart/form-data',
//                 },
//             }
//         );
//         const newData={...resellerData,id:response.data.data.reseller.id}
//         dispatch({ type: EDIT_RESELLER_SUCCESS, payload: newData});
//         toast.current?.show({
//             severity: "success",
//             summary: "Successful",
//             detail: "Reseller edited",
//             life: 3000,
//           });
//     } catch (error: any) {
//         dispatch({ type: EDIT_RESELLER_FAIL, payload: error.message });
//         //console.log(error)
//         toast.current?.show({
//             severity: "error",
//             summary: "Error",
//             detail: "Reseller edited fail",
//             life: 3000,
//           });
//     }
// };

// // Delete Reseller
// export const _deleteReseller = (id: number,toast: React.RefObject<Toast>) => async (dispatch: Dispatch) => {
//     dispatch({ type: DELETE_RESELLER_REQUEST });

//     try {
//         const token = getAuthToken();
//         await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/resellers/${id}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         dispatch({ type: DELETE_RESELLER_SUCCESS, payload: id });
//         toast.current?.show({
//             severity: "success",
//             summary: "Successful",
//             detail: "Reseller deleted",
//             life: 3000,
//           });
//     } catch (error: any) {
//         dispatch({ type: DELETE_RESELLER_FAIL, payload: error.message });
//         toast.current?.show({
//             severity: "error",
//             summary: "Error",
//             detail: "Reseller deleted fail",
//             life: 3000,
//           });
//     }
// };


// export const _changeResellerStatus = (id: number,status: number,toast: React.RefObject<Toast>) => async (dispatch: Dispatch) => {
//     dispatch({ type: CHANGE_RESELLER_STATUS_REQUEST });
//     //console.log(id)
//     try {
//         const token = getAuthToken();
//         const response = await axios.get(
//             `${process.env.NEXT_PUBLIC_BASE_URL}/resellers/change-reseller-status/${id}`,
//              // Send the new status in the request body
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             }
//         );
//         //console.log(response)
//         dispatch({
//             type: CHANGE_RESELLER_STATUS_SUCCESS,
//             payload: { id, status: status==1?0:1 },
//         });

//         toast.current?.show({
//             severity: "success",
//             summary: "Successful",
//             detail: `Reseller status changed to ${status === 1 ? "De-Active" : "Active"}`,
//             life: 3000,
//         });
//     } catch (error: any) {
//         dispatch({
//             type: CHANGE_RESELLER_STATUS_FAIL,
//             payload: error.message,
//         });

//         toast.current?.show({
//             severity: "error",
//             summary: "Error",
//             detail: "Failed to change reseller status",
//             life: 3000,
//         });
//     }
// };


// export const _getResellerById = (id: number) => async (dispatch: Dispatch) => {
//     dispatch({ type: GET_RESELLER_BY_ID_REQUEST });

//     try {
//         const token = getAuthToken(); // Assuming getAuthToken retrieves the token
//         const response = await axios.get(
//             `${process.env.NEXT_PUBLIC_BASE_URL}/resellers/${id}`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             }
//         );

//         dispatch({
//             type: GET_RESELLER_BY_ID_SUCCESS,
//             payload: response.data.data.reseller,
//         });
//     } catch (error: any) {
//         dispatch({
//             type: GET_RESELLER_BY_ID_FAIL,
//             payload: error.response?.data?.message || error.message,
//         });
//     }
// };


// export const _changeResellerPassword = (bodyData: any, toast: React.RefObject<Toast>) =>
//     async (dispatch: Dispatch) => {
//         dispatch({ type: CHANGE_RESELLER_PASSWORD_REQUEST });

//         try {
//             const token = getAuthToken();
//             //console.log(bodyData)
//             const response = await axios.post(
//                 `${process.env.NEXT_PUBLIC_BASE_URL}/resellers/set-reseller-password`,
//                 bodyData,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         "Content-Type": "application/json",
//                     },
//                 }
//             );
//             dispatch({ type: CHANGE_RESELLER_PASSWORD_SUCCESS });
//             Swal.fire({
//                 title: "Good job!",
//                 text: response.data.message,
//                 icon: "success"
//               });
//         } catch (error: any) {
//             dispatch({ type: CHANGE_RESELLER_PASSWORD_FAIL, payload: error.message });
//             Swal.fire({
//                 title: "Error!",
//                 text: error.response.data.message,
//                 icon: "error"
//               });
//         }
//     };

// // Change PIN
// export const _changeResellerPin = (bodyData: any, toast: React.RefObject<Toast>) =>
//     async (dispatch: Dispatch) => {
//         dispatch({ type: CHANGE_RESELLER_PIN_REQUEST });

//         try {
//             const token = getAuthToken();
//             const response = await axios.post(
//                 `${process.env.NEXT_PUBLIC_BASE_URL}/resellers/set-reseller-pin`,
//                 bodyData,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         "Content-Type": "application/json",
//                     },
//                 }
//             );

//             dispatch({ type: CHANGE_RESELLER_PIN_SUCCESS });
//             Swal.fire({
//                 title: "Good job!",
//                 text: response.data.message,
//                 icon: "success"
//               });
//         } catch (error: any) {
//             dispatch({ type: CHANGE_RESELLER_PIN_FAIL, payload: error.message });
//             Swal.fire({
//                 title: "Error!",
//                 text: error.response.data.message,
//                 icon: "error"
//               });
//         }
//     };


import axios from "axios";
import { Dispatch } from "redux";
import {
    FETCH_RESELLERS_REQUEST,
    FETCH_RESELLERS_SUCCESS,
    FETCH_RESELLERS_FAIL,
    ADD_RESELLER_REQUEST,
    ADD_RESELLER_SUCCESS,
    ADD_RESELLER_FAIL,
    EDIT_RESELLER_REQUEST,
    EDIT_RESELLER_SUCCESS,
    EDIT_RESELLER_FAIL,
    DELETE_RESELLER_REQUEST,
    DELETE_RESELLER_SUCCESS,
    DELETE_RESELLER_FAIL,
    CHANGE_RESELLER_STATUS_REQUEST,
    CHANGE_RESELLER_STATUS_SUCCESS,
    CHANGE_RESELLER_STATUS_FAIL,
    GET_RESELLER_BY_ID_REQUEST,
    GET_RESELLER_BY_ID_SUCCESS,
    GET_RESELLER_BY_ID_FAIL,
    CHANGE_RESELLER_PASSWORD_REQUEST,
    CHANGE_RESELLER_PASSWORD_SUCCESS,
    CHANGE_RESELLER_PASSWORD_FAIL,
    CHANGE_RESELLER_PIN_REQUEST,
    CHANGE_RESELLER_PIN_SUCCESS,
    CHANGE_RESELLER_PIN_FAIL,
} from "../constants/resellerConstants";
import { Toast } from "primereact/toast";
import { Reseller } from "@/types/interface";
import Swal from "sweetalert2";

const getAuthToken = () => {
    return localStorage.getItem("api_token") || "";
};

// Fetch Resellers
export const _fetchResellers = (
    page: number = 1,
    search: string = '',
    filters: any = {},
    items_per_page=15
) => async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_RESELLERS_REQUEST });

    try {
        const token = getAuthToken();
        const queryParams = new URLSearchParams();

        queryParams.append('search', search);

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                queryParams.append(key, String(value));
            }
        });


        const queryString = queryParams.toString();
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/resellers?items_per_page=${items_per_page}&page=${page}&${queryString}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        //console.log(response.data)
        dispatch({
            type: FETCH_RESELLERS_SUCCESS,
            payload: {
                data: response.data.data.resellers,
                pagination: response.data.payload.pagination,
            }
        });


    } catch (error: any) {
        dispatch({
            type: FETCH_RESELLERS_FAIL,
            payload: error.message
        });


    }
};

// Add Reseller
export const _addReseller = (
    resellerData: Reseller,
    toast: React.RefObject<Toast>,
    t: (key: string) => string
) => async (dispatch: Dispatch) => {
    dispatch({ type: ADD_RESELLER_REQUEST });

    try {
        const token = getAuthToken();
        const formData = new FormData();

        formData.append('reseller_name', resellerData.reseller_name);
        formData.append('contact_name', resellerData.contact_name);
        formData.append('email', resellerData.email);
        formData.append('phone', resellerData.phone);
        formData.append('password', resellerData.account_password);
        formData.append('country_id', String(resellerData.country_id));
        formData.append('province_id', String(resellerData.province_id));
        formData.append('districts_id', String(resellerData.districts_id));
        const currencyPreferenceId =
            typeof resellerData.code === "object" && resellerData.code !== null
                ? resellerData.code.id.toString()
                : "0";
        formData.append("currency_preference_id", currencyPreferenceId);
        formData.append('balance', resellerData.balance.toString());
        formData.append('reseller_group_id', String(resellerData.reseller_group_id));
        formData.append('can_create_sub_resellers', resellerData.can_create_sub_resellers.toString());
        formData.append('sub_reseller_limit', resellerData.sub_reseller_limit.toString());
        formData.append('sub_resellers_can_create_sub_resellers', resellerData.sub_resellers_can_create_sub_resellers.toString());

        if (resellerData.profile_image_url && typeof resellerData.profile_image_url !== 'string') {
            formData.append('profile_image_url', resellerData.profile_image_url);
        }
        //return

        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/resellers`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        const newData = {
            ...resellerData,
            profile_image_url: response.data.data.reseller.profile_image_url,
            id: response.data.data.reseller.id
        };

        //console.log(newData)

        dispatch({
            type: ADD_RESELLER_SUCCESS,
            payload: newData
        });

        toast.current?.show({
            severity: "success",
            summary: t("SUCCESS"),
            detail: t("RESELLER_ADDED"),
            life: 3000,
        });
    } catch (error: any) {
        dispatch({
            type: ADD_RESELLER_FAIL,
            payload: error.message
        });

        let errorMessage = t("RESELLER_ADD_FAILED");
        if (error.response?.status === 422 && error.response.data?.errors) {
            const errorMessages = Object.values(error.response.data.errors)
                .flat()
                .join(', ');
            errorMessage = errorMessages || t("VALIDATION_FAILED");
        } else if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
        }

        toast.current?.show({
            severity: "error",
            summary: t("ERROR"),
            detail: errorMessage,
            life: 3000,
        });
    }
};

// Edit Reseller
export const _editReseller = (
    id: number,
    resellerData: Reseller,
    toast: React.RefObject<Toast>,
    t: (key: string) => string
) => async (dispatch: Dispatch) => {
    dispatch({ type: EDIT_RESELLER_REQUEST });

    try {
        const token = getAuthToken();
        const formData = new FormData();

        formData.append('reseller_name', resellerData.reseller_name);
        formData.append('contact_name', resellerData.contact_name);
        formData.append('email', resellerData.email);
        formData.append('phone', resellerData.phone);
        formData.append('password', resellerData.account_password);
        formData.append('country_id', String(resellerData.country_id));
        formData.append('province_id', String(resellerData.province_id));
        formData.append('districts_id', String(resellerData.districts_id));
        const currencyPreferenceId =
            typeof resellerData.code === "object" && resellerData.code !== null
                ? resellerData.code.id.toString()
                : "0";
        formData.append("currency_preference_id", currencyPreferenceId); formData.append('balance', resellerData.balance.toString());
        formData.append('reseller_group_id', String(resellerData.reseller_group_id));
        formData.append('can_create_sub_resellers', resellerData.can_create_sub_resellers.toString());
        formData.append('sub_reseller_limit', resellerData.sub_reseller_limit.toString());
        formData.append('sub_resellers_can_create_sub_resellers', resellerData.sub_resellers_can_create_sub_resellers.toString());
        formData.append('is_reseller_verified', resellerData.is_reseller_verified.toString());
        formData.append('status', resellerData.status.toString());
        formData.append('loan_balance', resellerData.loan_balance);
        formData.append('total_payments_received', resellerData.total_payments_received);
        formData.append('total_balance_sent', resellerData.total_balance_sent);

        if (resellerData.profile_image_url && typeof resellerData.profile_image_url !== 'string') {
            formData.append('profile_image_url', resellerData.profile_image_url);
        }

        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/resellers/${id}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            }
        );



        const newData = {
            ...resellerData,
            id: response.data.data.reseller.id
        };
        //console.log(newData)

        dispatch({
            type: EDIT_RESELLER_SUCCESS,
            payload: newData
        });

        toast.current?.show({
            severity: "success",
            summary: t("SUCCESS"),
            detail: t("RESELLER_UPDATED"),
            life: 3000,
        });
    } catch (error: any) {
        dispatch({
            type: EDIT_RESELLER_FAIL,
            payload: error.message
        });

        let errorMessage = t("RESELLER_UPDATE_FAILED");
        if (error.response?.status === 422 && error.response.data?.errors) {
            const errorMessages = Object.values(error.response.data.errors)
                .flat()
                .join(', ');
            errorMessage = errorMessages || t("VALIDATION_FAILED");
        } else if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
        }

        toast.current?.show({
            severity: "error",
            summary: t("ERROR"),
            detail: errorMessage,
            life: 3000,
        });
    }
};

// Delete Reseller
export const _deleteReseller = (
    id: number,
    toast: React.RefObject<Toast>,
    t: (key: string) => string
) => async (dispatch: Dispatch) => {
    dispatch({ type: DELETE_RESELLER_REQUEST });

    try {
        const token = getAuthToken();
        await axios.delete(
            `${process.env.NEXT_PUBLIC_BASE_URL}/resellers/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        dispatch({
            type: DELETE_RESELLER_SUCCESS,
            payload: id
        });

        toast.current?.show({
            severity: "success",
            summary: t("SUCCESS"),
            detail: t("RESELLER_DELETED"),
            life: 3000,
        });
    } catch (error: any) {
        dispatch({
            type: DELETE_RESELLER_FAIL,
            payload: error.message
        });

        toast.current?.show({
            severity: "error",
            summary: t("ERROR"),
            detail: t("RESELLER_DELETE_FAILED"),
            life: 3000,
        });
    }
};

// Change Reseller Status
export const _changeResellerStatus = (
    id: number,
    status: number,
    toast: React.RefObject<Toast>,
    t: (key: string) => string
) => async (dispatch: Dispatch) => {
    dispatch({ type: CHANGE_RESELLER_STATUS_REQUEST });

    try {
        const token = getAuthToken();
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/resellers/change-reseller-status/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        dispatch({
            type: CHANGE_RESELLER_STATUS_SUCCESS,
            payload: { id, status: status === 1 ? 0 : 1 },
        });

        toast.current?.show({
            severity: "success",
            summary: t("SUCCESS"),
            detail: t("RESELLER_STATUS_CHANGED"),
            life: 3000,
        });
    } catch (error: any) {
        dispatch({
            type: CHANGE_RESELLER_STATUS_FAIL,
            payload: error.message,
        });

        toast.current?.show({
            severity: "error",
            summary: t("ERROR"),
            detail: t("RESELLER_STATUS_CHANGE_FAILED"),
            life: 3000,
        });
    }
};

// Get Reseller By ID
export const _getResellerById = (
    id: number,
) => async (dispatch: Dispatch) => {
    dispatch({ type: GET_RESELLER_BY_ID_REQUEST });

    try {
        const token = getAuthToken();
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/resellers/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        dispatch({
            type: GET_RESELLER_BY_ID_SUCCESS,
            payload: response.data.data.reseller,
        });


    } catch (error: any) {
        dispatch({
            type: GET_RESELLER_BY_ID_FAIL,
            payload: error.response?.data?.message || error.message,
        });


    }
};

// Change Reseller Password
export const _changeResellerPassword = (
    bodyData: any,
    toast: React.RefObject<Toast>,
    t: (key: string) => string
) => async (dispatch: Dispatch) => {
    dispatch({ type: CHANGE_RESELLER_PASSWORD_REQUEST });

    try {
        const token = getAuthToken();
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/resellers/set-reseller-password`,
            bodyData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        dispatch({ type: CHANGE_RESELLER_PASSWORD_SUCCESS });

        Swal.fire({
            title: t("SUCCESS"),
            text: t("RESELLER_PASSWORD_CHANGED"),
            icon: "success"
        });
    } catch (error: any) {
        dispatch({
            type: CHANGE_RESELLER_PASSWORD_FAIL,
            payload: error.message
        });

        Swal.fire({
            title: t("ERROR"),
            text: error.response?.data?.message || t("RESELLER_PASSWORD_CHANGE_FAILED"),
            icon: "error"
        });
    }
};

// Change Reseller PIN
export const _changeResellerPin = (
    bodyData: any,
    toast: React.RefObject<Toast>,
    t: (key: string) => string
) => async (dispatch: Dispatch) => {
    dispatch({ type: CHANGE_RESELLER_PIN_REQUEST });

    try {
        const token = getAuthToken();
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/resellers/set-reseller-pin`,
            bodyData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        dispatch({ type: CHANGE_RESELLER_PIN_SUCCESS });

        Swal.fire({
            title: t("SUCCESS"),
            text: t("RESELLER_PIN_CHANGED"),
            icon: "success"
        });
    } catch (error: any) {
        dispatch({
            type: CHANGE_RESELLER_PIN_FAIL,
            payload: error.message
        });

        Swal.fire({
            title: t("ERROR"),
            text: error.response?.data?.message || t("RESELLER_PIN_CHANGE_FAILED"),
            icon: "error"
        });
    }
};
