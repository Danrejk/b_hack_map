var callForActions = [
    {
        type: 'Workshop',
        name: 'Berlin Environment Hack',
        organizer: 'Eco Berlin',
        dateStart: '2025-08-01',
        dateEnd: '2025-08-02',
        description: '24-hour team coding and action for novel clean air solutions in Berlin.',
        lat: 52.52,
        lng: 13.405,
        image: "https://http.cat/images/100.jpg"
    },
    {
        type: 'Protest',
        name: 'Munich Climate March',
        organizer: 'Green Steps',
        dateStart: '2025-08-10',
        dateEnd: '2025-08-10',
        description: 'Citizens unite in Munich\'s downtown for climate justice.',
        lat: 48.137,
        lng: 11.576
    },
    {
        type: 'Seminar',
        name: 'Hamburg Water Future',
        organizer: 'Blue Planet Foundation',
        dateStart: '2025-09-05',
        dateEnd: '2025-09-05',
        description: 'Expert talks and workshops on innovative water conservation.',
        lat: 53.551,
        lng: 9.994,
        image: "https://http.cat/images/420.jpg"
    },
    {
        type: 'Cleanup',
        name: 'Frankfurt River Day',
        organizer: 'Clean Main',
        dateStart: '2025-08-28',
        dateEnd: '2025-08-28',
        description: 'Join local volunteers and keep the Main riverbanks trash-free!',
        lat: 50.1109,
        lng: 8.6821
    },
    // --- 50 NEWLY GENERATED EVENTS ---
    {
        type: 'Workshop',
        name: 'Forest Rally Event #1',
        organizer: 'Urban Future',
        dateStart: '2025-08-12',
        dateEnd: '2025-08-13',
        description: 'A community event to protect our environment.',
        lat: 50.6365,
        lng: 9.9539
    },
    {
        type: 'Training',
        name: 'Clean Main Event #2',
        organizer: 'Urban Future',
        dateStart: '2025-10-12',
        dateEnd: '2025-10-13',
        description: 'Festival celebrating green initiatives.',
        lat: 52.6877,
        lng: 8.3557
    },
    {
        type: 'Festival',
        name: 'Green Future Event #3',
        organizer: 'Clean Main',
        dateStart: '2025-08-30',
        dateEnd: '2025-09-01',
        description: 'Meetup to discuss climate policies.',
        lat: 52.7018,
        lng: 7.9715
    },
    {
        type: 'Workshop',
        name: 'Solar Workshop Event #4',
        organizer: 'Eco Berlin',
        dateStart: '2025-09-28',
        dateEnd: '2025-09-29',
        description: 'Training sessions on sustainable living.',
        lat: 50.6316,
        lng: 12.4174
    },
    {
        type: 'Festival',
        name: 'Sustainability Talk Event #5',
        organizer: 'Climate Action',
        dateStart: '2025-10-06',
        dateEnd: '2025-10-06',
        description: 'A festival celebrating green initiatives.',
        lat: 54.5094,
        lng: 8.2062
    },
    {
        type: 'Workshop',
        name: 'Forest Rally Event #6',
        organizer: 'Nature Champions',
        dateStart: '2025-11-14',
        dateEnd: '2025-11-15',
        description: 'Join us for action on climate change.',
        lat: 52.3933,
        lng: 11.5557
    },
    {
        type: 'Seminar',
        name: 'Eco Meetup Event #7',
        organizer: 'Earth Guardians',
        dateStart: '2025-09-05',
        dateEnd: '2025-09-07',
        description: 'Expert talks and workshops on innovative water conservation.',
        lat: 51.4322,
        lng: 7.2501
    },
    {
        type: 'Cleanup',
        name: 'River Clean Event #8',
        organizer: 'Blue Planet Foundation',
        dateStart: '2025-08-15',
        dateEnd: '2025-08-15',
        description: 'Volunteer to clean local waterways.',
        lat: 53.128,
        lng: 9.0231
    },
    {
        type: 'Protest',
        name: 'Eco Meetup Event #9',
        organizer: 'Urban Future',
        dateStart: '2025-11-03',
        dateEnd: '2025-11-03',
        description: 'A protest rally for environmental justice.',
        lat: 54.9357,
        lng: 13.8788
    },
    {
        type: 'Cleanup',
        name: 'Green Future Event #10',
        organizer: 'Climate Action',
        dateStart: '2025-08-04',
        dateEnd: '2025-08-06',
        description: 'Join local volunteers and keep the riverbanks trash-free.',
        lat: 48.3365,
        lng: 13.4146
    },
    {
        type: 'Training',
        name: 'Forest Rally Event #11',
        organizer: 'Nature Champions',
        dateStart: '2025-08-15',
        dateEnd: '2025-08-17',
        description: 'Hands-on workshop for solar energy use.',
        lat: 53.786,
        lng: 11.8894
    },
    {
        type: 'Seminar',
        name: 'Green Future Event #12',
        organizer: 'Green Steps',
        dateStart: '2025-09-02',
        dateEnd: '2025-09-02',
        description: 'Expert talks and workshops on innovative water conservation.',
        lat: 53.3577,
        lng: 7.8954
    },
    {
        type: 'Workshop',
        name: 'Urban Planting Event #13',
        organizer: 'Clean Main',
        dateStart: '2025-09-09',
        dateEnd: '2025-09-11',
        description: 'Discussion on urban greenery improvements.',
        lat: 50.5583,
        lng: 8.4967
    },
    {
        type: 'Cleanup',
        name: 'Climate Action Event #14',
        organizer: 'Nature Champions',
        dateStart: '2025-10-04',
        dateEnd: '2025-10-04',
        description: 'Volunteer to clean local waterways.',
        lat: 49.7919,
        lng: 12.581
    },
    {
        type: 'Festival',
        name: 'Forest Rally Event #15',
        organizer: 'Blue Planet Foundation',
        dateStart: '2025-08-21',
        dateEnd: '2025-08-22',
        description: 'Festival celebrating green initiatives.',
        lat: 51.9043,
        lng: 6.812
    },
    {
        type: 'Seminar',
        name: 'Solar Workshop Event #16',
        organizer: 'Blue Planet Foundation',
        dateStart: '2025-09-29',
        dateEnd: '2025-09-30',
        description: 'Expert talks and workshops on innovative water conservation.',
        lat: 54.2338,
        lng: 10.4682
    },
    {
        type: 'Workshop',
        name: 'Urban Planting Event #17',
        organizer: 'Green Steps',
        dateStart: '2025-09-10',
        dateEnd: '2025-09-11',
        description: 'Training sessions on sustainable living.',
        lat: 49.3149,
        lng: 12.9711
    },
    {
        type: 'Cleanup',
        name: 'Green Future Event #18',
        organizer: 'Nature Champions',
        dateStart: '2025-10-29',
        dateEnd: '2025-10-30',
        description: 'Join local volunteers and keep the riverbanks trash-free.',
        lat: 48.9321,
        lng: 12.249
    },
    {
        type: 'Workshop',
        name: 'Green Future Event #19',
        organizer: 'Earth Guardians',
        dateStart: '2025-09-08',
        dateEnd: '2025-09-09',
        description: 'Hands-on workshop for solar energy use.',
        lat: 53.9147,
        lng: 10.7795
    },
    {
        type: 'Protest',
        name: 'River Clean Event #20',
        organizer: 'Eco Berlin',
        dateStart: '2025-09-14',
        dateEnd: '2025-09-14',
        description: 'A protest rally for environmental justice.',
        lat: 50.2321,
        lng: 13.1601
    },
    {
        type: 'Workshop',
        name: 'Urban Planting Event #21',
        organizer: 'Clean Main',
        dateStart: '2025-08-18',
        dateEnd: '2025-08-20',
        description: 'Workshops and talks from top experts.',
        lat: 54.561,
        lng: 10.3559
    },
    {
        type: 'Seminar',
        name: 'Green Future Event #22',
        organizer: 'Green Steps',
        dateStart: '2025-10-28',
        dateEnd: '2025-10-28',
        description: 'Discussion on urban greenery improvements.',
        lat: 54.6574,
        lng: 9.0288
    },
    {
        type: 'Festival',
        name: 'Forest Rally Event #23',
        organizer: 'Urban Future',
        dateStart: '2025-11-18',
        dateEnd: '2025-11-18',
        description: 'Festival celebrating green initiatives.',
        lat: 49.6565,
        lng: 9.9709
    },
    {
        type: 'Seminar',
        name: 'Climate Action Event #24',
        organizer: 'Eco Berlin',
        dateStart: '2025-10-02',
        dateEnd: '2025-10-03',
        description: 'Expert talks and workshops on innovative water conservation.',
        lat: 49.4071,
        lng: 13.6196
    },
    {
        type: 'Workshop',
        name: 'Eco Meetup Event #25',
        organizer: 'Earth Guardians',
        dateStart: '2025-10-13',
        dateEnd: '2025-10-13',
        description: 'Training sessions on sustainable living.',
        lat: 50.5447,
        lng: 14.0067
    },
    {
        type: 'Cleanup',
        name: 'Urban Planting Event #26',
        organizer: 'Urban Future',
        dateStart: '2025-08-13',
        dateEnd: '2025-08-15',
        description: 'Volunteer to clean local waterways.',
        lat: 50.9644,
        lng: 7.4944
    },
    {
        type: 'Workshop',
        name: 'Sustainability Talk Event #27',
        organizer: 'Blue Planet Foundation',
        dateStart: '2025-08-11',
        dateEnd: '2025-08-13',
        description: 'Discussion on urban greenery improvements.',
        lat: 50.9015,
        lng: 6.1434
    },
    {
        type: 'Cleanup',
        name: 'Solar Workshop Event #28',
        organizer: 'Earth Guardians',
        dateStart: '2025-09-13',
        dateEnd: '2025-09-14',
        description: 'Volunteer to clean local waterways.',
        lat: 48.7089,
        lng: 10.2487
    },
    {
        type: 'Festival',
        name: 'Climate Action Event #29',
        organizer: 'Nature Champions',
        dateStart: '2025-08-27',
        dateEnd: '2025-08-28',
        description: 'Festival celebrating green initiatives.',
        lat: 53.3351,
        lng: 7.4812
    },
    {
        type: 'Seminar',
        name: 'Clean Air Event #30',
        organizer: 'Earth Guardians',
        dateStart: '2025-10-11',
        dateEnd: '2025-10-12',
        description: 'Workshops and talks from top experts.',
        lat: 53.5378,
        lng: 11.8974
    },
    {
        type: 'Cleanup',
        name: 'Eco Meetup Event #31',
        organizer: 'Green Steps',
        dateStart: '2025-09-28',
        dateEnd: '2025-09-29',
        description: 'Volunteer to clean local waterways.',
        lat: 52.0931,
        lng: 11.9026
    },
    {
        type: 'Training',
        name: 'River Clean Event #32',
        organizer: 'Climate Action',
        dateStart: '2025-10-10',
        dateEnd: '2025-10-12',
        description: 'Training sessions on sustainable living.',
        lat: 54.2668,
        lng: 6.4868
    },
    {
        type: 'Seminar',
        name: 'Eco Meetup Event #33',
        organizer: 'Blue Planet Foundation',
        dateStart: '2025-09-03',
        dateEnd: '2025-09-03',
        description: 'Expert talks and workshops on innovative water conservation.',
        lat: 53.2825,
        lng: 13.2886
    },
    {
        type: 'Cleanup',
        name: 'Clean Main Event #34',
        organizer: 'Earth Guardians',
        dateStart: '2025-08-21',
        dateEnd: '2025-08-23',
        description: 'Volunteer to clean local waterways.',
        lat: 54.9577,
        lng: 6.0226
    },
    {
        type: 'Workshop',
        name: 'Solar Workshop Event #35',
        organizer: 'Nature Champions',
        dateStart: '2025-09-15',
        dateEnd: '2025-09-15',
        description: 'Meetup to discuss climate policies.',
        lat: 48.8173,
        lng: 9.4135
    },
    {
        type: 'Seminar',
        name: 'Urban Planting Event #36',
        organizer: 'Urban Future',
        dateStart: '2025-10-25',
        dateEnd: '2025-10-27',
        description: 'Expert talks and workshops on innovative water conservation.',
        lat: 51.6197,
        lng: 13.0066
    },
    {
        type: 'Festival',
        name: 'Forest Rally Event #37',
        organizer: 'Eco Berlin',
        dateStart: '2025-11-11',
        dateEnd: '2025-11-13',
        description: 'Festival celebrating green initiatives.',
        lat: 47.8307,
        lng: 13.0751
    },
    {
        type: 'Training',
        name: 'Urban Planting Event #38',
        organizer: 'Nature Champions',
        dateStart: '2025-09-05',
        dateEnd: '2025-09-06',
        description: 'Training sessions on sustainable living.',
        lat: 48.4781,
        lng: 7.8386
    },
    {
        type: 'Workshop',
        name: 'Green Future Event #39',
        organizer: 'Eco Berlin',
        dateStart: '2025-09-16',
        dateEnd: '2025-09-16',
        description: 'Hands-on workshop for solar energy use.',
        lat: 48.4577,
        lng: 7.5815
    },
    {
        type: 'Seminar',
        name: 'Solar Workshop Event #40',
        organizer: 'Climate Action',
        dateStart: '2025-10-03',
        dateEnd: '2025-10-05',
        description: 'Expert talks and workshops on innovative water conservation.',
        lat: 54.2138,
        lng: 12.4245
    },
    {
        type: 'Cleanup',
        name: 'Urban Planting Event #41',
        organizer: 'Nature Champions',
        dateStart: '2025-11-14',
        dateEnd: '2025-11-14',
        description: 'Join local volunteers and keep the riverbanks trash-free.',
        lat: 53.0834,
        lng: 11.5037
    },
    {
        type: 'Festival',
        name: 'Sustainability Talk Event #42',
        organizer: 'Urban Future',
        dateStart: '2025-09-02',
        dateEnd: '2025-09-03',
        description: 'Festival celebrating green initiatives.',
        lat: 52.6267,
        lng: 6.9841
    },
    {
        type: 'Protest',
        name: 'River Clean Event #43',
        organizer: 'Urban Future',
        dateStart: '2025-08-23',
        dateEnd: '2025-08-23',
        description: 'A protest rally for environmental justice.',
        lat: 52.1264,
        lng: 6.3283
    },
    {
        type: 'Cleanup',
        name: 'Clean Air Event #44',
        organizer: 'Blue Planet Foundation',
        dateStart: '2025-08-30',
        dateEnd: '2025-08-30',
        description: 'Join us for action on climate change.',
        lat: 49.2409,
        lng: 11.0136
    },
    {
        type: 'Workshop',
        name: 'Urban Planting Event #45',
        organizer: 'Nature Champions',
        dateStart: '2025-10-29',
        dateEnd: '2025-10-30',
        description: 'Hands-on workshop for solar energy use.',
        lat: 51.0017,
        lng: 9.1799
    },
    {
        type: 'Workshop',
        name: 'Green Future Event #46',
        organizer: 'Green Steps',
        dateStart: '2025-08-25',
        dateEnd: '2025-08-26',
        description: 'Discussion on urban greenery improvements.',
        lat: 51.0017,
        lng: 9.1799
    },
    {
        type: 'Workshop',
        name: 'Clean Air Event #47',
        organizer: 'Climate Action',
        dateStart: '2025-10-29',
        dateEnd: '2025-10-30',
        description: 'Meetup to discuss climate policies.',
        lat: 48.6442,
        lng: 8.7208
    },
    {
        type: 'Protest',
        name: 'Urban Planting Event #48',
        organizer: 'Blue Planet Foundation',
        dateStart: '2025-10-23',
        dateEnd: '2025-10-23',
        description: 'Discussion on urban greenery improvements.',
        lat: 49.3103,
        lng: 14.0221
    },
    {
        type: 'Festival',
        name: 'Eco Meetup Event #49',
        organizer: 'Clean Main',
        dateStart: '2025-09-03',
        dateEnd: '2025-09-05',
        description: 'Join us for action on climate change.',
        lat: 48.3067,
        lng: 12.647
    },
    {
        type: 'Cleanup',
        name: 'Solar Workshop Event #50',
        organizer: 'Climate Action',
        dateStart: '2025-08-23',
        dateEnd: '2025-08-25',
        description: 'Join us for action on climate change.',
        lat: 50.6532,
        lng: 11.9212
    }
];
