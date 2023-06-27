/* eslint-disable max-lines */
import { Field, FieldArrayRenderProps } from 'formik';
import React from 'react';
import DropDown from '../DropDown';
import AddButton from './addButton';
import RemoveButton from './removeButton';
import { Row } from './styles';

interface Props {
  values: string;
  arrayHelpers: FieldArrayRenderProps;
}

function FieldArrayDropDownComponent(props: Props) {
  const { values, arrayHelpers } = props;

  // it expects a string so we must make it an array
  const tmp = values.split(',');

  return (
    <div>
      {tmp.map((_data: any, index: number) => (
        <Row key={index}>
          <Field
            name={`iso_code.${index}`}
            component={DropDown}
            callback={(result: any) => {
              arrayHelpers.replace(index, result);
            }}
            options={[
              { value: '', label: '' },
              { value: 'AUS', label: 'Australia' },
              { value: 'USA', label: 'United States' },
              { value: 'AFG', label: 'Afghanistan' },
              { value: 'ALB', label: 'Albania' },
              { value: 'DZA', label: 'Algeria' },
              { value: 'AGO', label: 'Angola' },
              { value: 'ARG', label: 'Argentina' },
              { value: 'ARM', label: 'Armenia' },
              { value: 'ABW', label: 'Aruba' },
              { value: 'AUT', label: 'Austria' },
              { value: 'AZE', label: 'Azerbaijan' },
              { value: 'BHR', label: 'Bahrain' },
              { value: 'BGD', label: 'Bangladesh' },
              { value: 'BRB', label: 'Barbados' },
              { value: 'BLR', label: 'Belarus' },
              { value: 'BEL', label: 'Belgium' },
              { value: 'BRA', label: 'Brazil' },
              { value: 'BGR', label: 'Bulgaria' },
              { value: 'BFA', label: 'Burkina Faso' },
              { value: 'BDI', label: 'Burundi' },
              { value: 'KHM', label: 'Cambodia' },
              { value: 'CMR', label: 'Cameroon' },
              { value: 'CAN', label: 'Canada' },
              { value: 'CPV', label: 'Cape Verde' },
              { value: 'CYM', label: 'Cayman Islands' },
              { value: 'TCD', label: 'Chad' },
              { value: 'CHL', label: 'Chile' },
              { value: 'CHN', label: 'China' },
              { value: 'COL', label: 'Colombia' },
              { value: 'COM', label: 'Comoros' },
              { value: 'COG', label: 'Congo' },
              { value: 'COK', label: 'Cook Islands' },
              { value: 'CRI', label: 'Costa Rica' },
              { value: 'HRV', label: 'Croatia' },
              { value: 'CUB', label: 'Cuba' },
              { value: 'CYP', label: 'Cyprus' },
              { value: 'CZE', label: 'Czechia' },
              { value: 'DNK', label: 'Denmark' },
              { value: 'EGY', label: 'Egypt' },
              { value: 'FRO', label: 'Faeroe Islands' },
              { value: 'FJI', label: 'Fiji' },
              { value: 'FIN', label: 'Finland' },
              { value: 'FRA', label: 'France' },
              { value: 'GUF', label: 'French Guiana' },
              { value: 'PYF', label: 'French Polynesia' },
              { value: 'GAB', label: 'Gabon' },
              { value: 'GMB', label: 'Gambia' },
              { value: 'GEO', label: 'Georgia' },
              { value: 'DEU', label: 'Germany' },
              { value: 'GHA', label: 'Ghana' },
              { value: 'GIB', label: 'Gibraltar' },
              { value: 'GRC', label: 'Greece' },
              { value: 'GRL', label: 'Greenland' },
              { value: 'GRD', label: 'Grenada' },
              { value: 'GLP', label: 'Guadeloupe' },
              { value: 'GUM', label: 'Guam' },
              { value: 'GTM', label: 'Guatemala' },
              { value: 'GIN', label: 'Guinea' },
              { value: 'GNB', label: 'Guinea-Bissau' },
              { value: 'GUY', label: 'Guyana' },
              { value: 'HTI', label: 'Haiti' },
              { value: 'HND', label: 'Honduras' },
              { value: 'HKG', label: 'Hong Kong' },
              { value: 'HUN', label: 'Hungary' },
              { value: 'ISL', label: 'Iceland' },
              { value: 'IND', label: 'India' },
              { value: 'IDN', label: 'Indonesia' },
              { value: 'IRN', label: 'Iran' },
              { value: 'IRQ', label: 'Iraq' },
              { value: 'IRL', label: 'Ireland' },
              { value: 'ISR', label: 'Israel' },
              { value: 'ITA', label: 'Italy' },
              { value: 'JAM', label: 'Jamaica' },
              { value: 'JPN', label: 'Japan' },
              { value: 'JOR', label: 'Jordan' },
              { value: 'KAZ', label: 'Kazakhstan' },
              { value: 'KEN', label: 'Kenya' },
              { value: 'LBN', label: 'Lebanon' },
              { value: 'LTU', label: 'Lithuania' },
              { value: 'LUX', label: 'Luxembourg' },
              { value: 'MDG', label: 'Madagascar' },
              { value: 'MWI', label: 'Malawi' },
              { value: 'MYS', label: 'Malaysia' },
              { value: 'MDV', label: 'Maldives' },
              { value: 'MLT', label: 'Malta' },
              { value: 'MEX', label: 'Mexico' },
              { value: 'MNG', label: 'Mongolia' },
              { value: 'MNE', label: 'Montenegro' },
              { value: 'MSR', label: 'Montserrat' },
              { value: 'MAR', label: 'Morocco' },
              { value: 'MOZ', label: 'Mozambique' },
              { value: 'NRU', label: 'Nauru' },
              { value: 'NPL', label: 'Nepal' },
              { value: 'NLD', label: 'Netherlands' },
              { value: 'NZL', label: 'New Zealand' },
              { value: 'NIC', label: 'Nicaragua' },
              { value: 'NER', label: 'Niger' },
              { value: 'NGA', label: 'Nigeria' },
              { value: 'NIU', label: 'Niue' },
              { value: 'PRK', label: 'North Korea' },
              { value: 'MKD', label: 'North Macedonia' },
              { value: 'NOR', label: 'Norway' },
              { value: 'OMN', label: 'Oman' },
              { value: 'PAK', label: 'Pakistan' },
              { value: 'PAN', label: 'Panama' },
              { value: 'PNG', label: 'Papua New Guinea' },
              { value: 'PRY', label: 'Paraguay' },
              { value: 'PER', label: 'Peru' },
              { value: 'PHL', label: 'Philippines' },
              { value: 'POL', label: 'Poland' },
              { value: 'PRT', label: 'Portugal' },
              { value: 'PRI', label: 'Puerto Rico' },
              { value: 'ROU', label: 'Romania' },
              { value: 'RUS', label: 'Russia' },
              { value: 'RWA', label: 'Rwanda' },
              { value: 'SHN', label: 'Saint Helena' },
              { value: 'LCA', label: 'Saint Lucia' },
              { value: 'SAU', label: 'Saudi Arabia' },
              { value: 'SEN', label: 'Senegal' },
              { value: 'SRB', label: 'Serbia' },
              { value: 'SYC', label: 'Seychelles' },
              { value: 'SLE', label: 'Sierra Leone' },
              { value: 'SGP', label: 'Singapore' },
              { value: 'SVK', label: 'Slovakia' },
              { value: 'SVN', label: 'Slovenia' },
              { value: 'SLB', label: 'Solomon Islands' },
              { value: 'SOM', label: 'Somalia' },
              { value: 'ZAF', label: 'South Africa' },
              { value: 'KOR', label: 'South Korea' },
              { value: 'SSD', label: 'South Sudan' },
              { value: 'ESP', label: 'Spain' },
              { value: 'LKA', label: 'Sri Lanka' },
              { value: 'SDN', label: 'Sudan' },
              { value: 'SUR', label: 'Suriname' },
              { value: 'SWE', label: 'Sweden' },
              { value: 'CHE', label: 'Switzerland' },
              { value: 'TWN', label: 'Taiwan' },
              { value: 'TJK', label: 'Tajikistan' },
              { value: 'TZA', label: 'Tanzania' },
              { value: 'THA', label: 'Thailand' },
              { value: 'TLS', label: 'Timor' },
              { value: 'TUN', label: 'Tunisia' },
              { value: 'TUR', label: 'Turkey' },
              { value: 'TKM', label: 'Turkmenistan' },
              { value: 'UGA', label: 'Uganda' },
              { value: 'UKR', label: 'Ukraine' },
              { value: 'ARE', label: 'United Arab Emirates' },
              { value: 'GBR', label: 'United Kingdom' },
              { value: 'VUT', label: 'Vanuatu' },
              { value: 'VEN', label: 'Venezuela' },
              { value: 'VNM', label: 'Vietnam' },
              { value: 'ESH', label: 'Western Sahara' },
              { value: 'YEM', label: 'Yemen' },
              { value: 'ZMB', label: 'Zambia' },
              { value: 'ZWE', label: 'Zimbabwe' }
            ]}
          />
          <RemoveButton arrayHelpers={arrayHelpers} index={index} />
        </Row>
      ))}
      <AddButton arrayHelpers={arrayHelpers} />
    </div>
  );
}

export default FieldArrayDropDownComponent;
