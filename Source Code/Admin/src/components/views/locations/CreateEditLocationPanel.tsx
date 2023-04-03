import { useNavigate, useParams } from 'react-router';
import Panel from '../../Panel';
import { Fragment, useEffect, useState } from 'react';
import { Location, LocationState } from '../../../admin.types';
import TextInput from '../../primitives/TextInput';
import PrimaryButton from '../../primitives/PrimaryButton';
import TextButton from '../../primitives/TextButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLocation, fetchLocationById, updateLocation } from '../../../api/location';
import { validateLength } from '../../../utils/validation';
import { useValidation } from '../../../hooks/validation';
import { findItemInCacheArray } from '../../../utils/query';
import { usePage } from '../../../contexts/PageContext';

export default function CreateEditLocationPanel() {

	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { id } = useParams();	

	const { page } = usePage();

	// state
	const [error, setError] = useState<boolean>(false);
	const [location, setLocation] = useState<LocationState>({
		locationName: '',
		city: '',
		country: ''
	});

	const mutation = useMutation(id
		? (location: LocationState) => updateLocation(Number(id), location)
		: (location: LocationState) => createLocation(location));

	// validation
	const { name, city, country } = useValidation({
		"name": { message: 'Name cannot be empty', isValid: true, validator: validateLength },
		"city": { message: 'City cannot be empty', isValid: true, validator: validateLength },
		"country": { message: 'Country cannot be empty', isValid: true, validator: validateLength },
	});	

	// fetch event data when editing
	useEffect(() => {

		if (id) {

			queryClient.fetchQuery(["location", Number(id)], () => fetchLocationById(Number(id)))
			.then((data) => {
				setLocation({
					locationName: data.locationName,
					city: data.city,
					country: data.country
				});
			})			
		}

	}, [id])

	// navigation
	const navigateBack = () => navigate(-1);

	// update state
	const setName = (value: string) => {
		name.validate(value);
		setLocation({ ...location, locationName: value });
	};

	const setCity = (value: string) => {
		city.validate(value);
		setLocation({ ...location, city: value });
	};

	const setCountry = (value: string) => {
		country.validate(value);
		setLocation({ ...location, country: value });
	};

	// on submit
	const submit = () => {
		
		setError(false);		

		if (name.validate(location.locationName)
			&& city.validate(location.city)
			&& country.validate(location.country)) {
			
			mutation.reset();

			// send network request
			mutation.mutate(location,
				{
					onSuccess: () => {
						
						// find query cache which has the item
						const { queryKey, itemIndex } = findItemInCacheArray<Location>(queryClient, 'locations', (i: Location) => i.locationId === Number(id))

						// update query cache
						if (queryKey && itemIndex) {
							queryClient.setQueryData(queryKey, (prev: any) => {
		
								return [
									...prev.slice(0, itemIndex),
									{
										locationId: Number(id),
										locationName: location.locationName,
										city: location.city,
										country: location.country
									},
									...prev.slice(itemIndex + 1)	
								]
							})

							queryClient.invalidateQueries(['locationCount']);		

						} else {							
							queryClient.invalidateQueries(['locations', page]);
							queryClient.invalidateQueries(['locationCount']);							
						}

						// navigate back
						if (id) {
							navigate(`/locations/${id}`);
						} else {
							navigateBack();
						}

					},
					onError: () => {
						setError(true);				
					}
				});

		}

	};
	

	return (
		<Fragment>
			<Panel.Header title={`${id ? 'Edit' : 'Create'} Event`}/>

			<div className='flex flex-col gap-5'>
				<TextInput value={location.locationName ?? ''} label='Name' onChange={setName} validation={name.validation}/>
				<TextInput value={location.city ?? ''} label='City' onChange={setCity} validation={city.validation}/>
				<TextInput value={location.country ?? ''} label='Country' onChange={setCountry} validation={country.validation}/>
			</div>
			

			<div className='mt-auto'>
				{ error && 
					<p className='w-full mt-auto text-right text-red-600'>
						Server Error. Could not create location.
					</p>
				}
				
				<div className='flex justify-end gap-3 pt-5'>
					<TextButton onClick={navigateBack}> Cancel </TextButton>
					<PrimaryButton disabled={mutation.isLoading} onClick={submit}> { id ? 'Update Location' : 'Create Location' } </PrimaryButton>
				</div>
			</div>

		</Fragment>
	)
}

