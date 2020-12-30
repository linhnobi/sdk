export interface TrackBody {
    track: {
        profile_id: string,
        device_id: string,
        customer_id: string,
		draft_id: string,
		u_id: string,
        type: string,
        info: {
            url: string
        }
    },
    meta_data: {
        source_type: string,
        website: {
            domain: string
        },
        app: {
            id: string,
            name: string,
            device_type: string,
            device_name: string
        }
    }
}
