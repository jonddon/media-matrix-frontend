import React,{Fragment} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { jsPDF } from "jspdf";
import "jspdf-autotable";

import styles from './Explore.module.css';
import Loading from '../../components/Loading';


class Explore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            searchLoading: false,
            mediaOpportunities: [],
            mediaTypes: [],
            categories: [],
            countries: [],
            frequencies: [],
            selectedCategories: [],
            selectedCountries: [],
            selectedFrequencies: [],
          selectedMediaTypes: [],
            noResult:''
        };
      }

      componentDidMount(){
          this.fetchMediaTypes();
          this.fetchCategories();
          this.fetchFrequencies();
          this.fetchCountries();
      }

      fetchMediaOpportunities = async (url) =>{
        try{
          const response = await axios.get(`https://media-matrix-backend.herokuapp.com/media-opportunities?${url}`)
          const media = response.data;
          if (media.length !== 0) {
            this.setState({ mediaOpportunities: media })
            this.setState({noResult:''})
            // console.log( media, 'media opportunities')
          }
          else {
            this.setState({noResult:"No Media opportunity found"})
          }
          
        } catch (error){
          this.setState({searchLoading: false})
          console.log(error)
        }
        this.setState({searchLoading: false})
      }

      fetchMediaTypes = async () =>{
        try{
          const response = await axios.get('https://media-matrix-backend.herokuapp.com/media-types')
          const types = response.data;
          const mediaOptions = types.map((mediaOption) => ({label: mediaOption.media_type, value: mediaOption.media_type}))
          this.setState({mediaTypes: mediaOptions})
          // console.log( types, 'media types')
        } catch (error){
          this.setState({loading: false})
          console.log(error)
        }
        this.setState({loading: false})
      }

      fetchCategories = async () =>{
        try{
          const response = await axios.get('https://media-matrix-backend.herokuapp.com/categories')
          const categories = response.data;
          // console.log( categories, 'Categories')
          const categoryOptions = categories.map((categoryOption) => ({label: categoryOption.category, value: categoryOption.category}))
          this.setState({categories: categoryOptions})
        } catch (error){
          this.setState({loading: false})
          console.log(error)
        }
        this.setState({loading: false})
      }

      fetchFrequencies = async () =>{
        try{
          const response = await axios.get('https://media-matrix-backend.herokuapp.com/frequencies')
          const frequencies = response.data;
          const frequencyOptions = frequencies.map((frequencyOption) => ({label: frequencyOption.frequency, value: frequencyOption.frequency}))
          this.setState({frequencies: frequencyOptions})
          // console.log( frequencies, 'Frequencies')
        } catch (error){
          this.setState({loading: false})
          console.log(error)
        }
        this.setState({loading: false})
      }

      fetchCountries = async () =>{
        try{
          const response = await axios.get('https://media-matrix-backend.herokuapp.com/countries')
          const countries = response.data;
          const countryOptions = countries.map((countryOption) => ({label: countryOption.country, value: countryOption.country}))
          this.setState({countries: countryOptions})
          // console.log( countries, 'Countries')
        } catch (error){
          this.setState({loading: false})
          console.log(error)
        }
        this.setState({loading: false})
      }

      handleChangeCategory = selectedCategories => {
        this.setState({ selectedCategories });
        // console.log('Category Option selected:', selectedCategories);
      }

      handleChangeFrequency = selectedFrequencies => {
        this.setState({ selectedFrequencies });
        // console.log(' Frequency Option selected:', selectedFrequencies);
      }

      handleChangeCountry = selectedCountries => {
        this.setState({ selectedCountries });
        // console.log(' country Option selected:', selectedCountries);
      }

      handleChangeMediaType = selectedMediaTypes => {
        this.setState({ selectedMediaTypes });
        console.log(' MediaType Option selected:', selectedMediaTypes);
      }

      handleSubmit=(e)=> {
        e.preventDefault();
        var url = '';
        this.setState({searchLoading: true})
        if (this.state.selectedCategories.length !== 0) {
            this.state.selectedCategories.forEach((category) => {
                url += 'categories.category=' + category.value + '&'
              // return  console.log(url);
            })
        }
         if ( this.state.selectedMediaTypes.length !== 0) {
           this.state.selectedMediaTypes.forEach((mediaType) => {
                url += 'media_type.media_type=' + mediaType.value + '&'
              //  return console.log(url);
            })
         }
         if(this.state.selectedCountries.length !== 0) {
           this.state.selectedCountries.forEach(country => {
             url += 'country.country=' + country.value + '&'
            // return console.log(url)
           })
         }
         if(this.state.selectedFrequencies.length !== 0) {
           this.state.selectedFrequencies.forEach(frequency => {
             url += 'frequency.frequency=' + frequency.value + '&'
            // console.log(url)
           })
         }
        url += "_limit=1000"
        
        this.fetchMediaOpportunities(url)
        

      }
  
  listCategory(categories) {
    return categories.map(
      (category,index) => {
        if (categories.length !== index + 1) {
          return category.category +", "
        }
        else {
          return category.category
        }
        
      }
    )
    
  }

  renderTableData = () => {
        
    try {
      if (this.state.mediaOpportunities.length !== 0) {
      return this.state.mediaOpportunities.map((mediaOpportunity, index) => {
        let { id, media_house, programme_name, description, media_type, contact_name, contact_email, contact_number, categories, frequency } = mediaOpportunity; //destructuring

        //When the frequency is not choosen from backend
        if (frequency === null) {
          frequency=''
        }
        else {
          frequency = frequency.frequency
        }
        
        //When the media type is not choosen from backend
        if (media_type === null) {
          media_type=''
        }
        else {
          media_type = media_type.media_type
        }

        //check and render table element if media opportunity is not empty
        if (mediaOpportunity.length !== 0) {
          
            return (
              <tr key={id}>
                 <td>{index+1}</td>
                 <td>{media_house}</td>
                 <td>{programme_name}</td>
                <td>{description}</td>
                <td>{media_type}</td>
                <td>
                    {this.listCategory(categories)}
          
                </td>
                <td>
                    {frequency}
          
                </td>
                <td>
                  {contact_name}<br></br>
                  <a href={"mailto:" + contact_email}>{contact_email}</a><br></br>
                  {contact_number}
                </td>
                
              </tr>
              
              
           )
          }else {
            return(
              <div>Sorry No Opportunities Yet!</div>
            );
          }
        })
    }
      
    } catch (error) {
        console.log(error)
    }
        
  }

  checkFrequency(frequency) {
    
        //When the frequency is not choosen from backend
        if (frequency === null) {
          return frequency=''
        }
        else {
          return frequency = frequency.frequency
        }
        
  }
  
  checkMediaType(media_type) {
     //When the media type is not choosen from backend
        if (media_type === null) {
          return media_type=''
        }
        else {
          return media_type = media_type.media_type
        }
  }

  exportPDF = () => {
        const unit = 'pt';
        const size = 'A4'; // Use A1, A2, A3 or A4
        const orientation = 'landscape'; // portrait or landscape
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
        doc.setFontSize(10);
        const title = 'Media Opportunities';
            const headers = [['S/N', 'MEDIA TYPE', 'MEDIA HOUSE', 'PROGRAMME NAME','CATEGORY', 'FREQUENCY', 'CONTACT NAME', 'CONTACT EMAIL', 'CONTACT NUMBER']];
            const data = this.state.mediaOpportunities.map(
                (media_opportunity, index )=> [(index+1), this.checkMediaType(media_opportunity.media_type), media_opportunity.media_house,
                media_opportunity.programme_name,
                this.listCategory(media_opportunity.categories),
                this.checkFrequency(media_opportunity.frequency),    
                media_opportunity.contact_name,
                media_opportunity.contact_email,
                media_opportunity.contact_number
                ]);
        let content = {
          startY: 50,
          head: headers,
          body: data
        };
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save('report.pdf')
      }

      renderButton=()=>{
        if(this.state.selectedCategories.length === 0 && this.state.selectedMediaTypes.length === 0 &&  this.state.selectedFrequencies.length === 0 && this.state.selectedCountries.length === 0){
            return(
              <button disabled={true} cursor="not-allowed" className={styles.search}>Search</button>
            )
        } else {
            return (
              <button type='submit' onClick={this.handleSubmit} className={styles.search}>Search</button>
            );
        }
    }

    render(){
        const {loading,searchLoading} = this.state;

        const animatedComponents = makeAnimated();

        return(
                <div className={styles.container}>
                    <div className={styles.head}>
                        <h1 className={styles.headerText}>Explore Media Opportunities</h1>
                        <h2 className={styles.headerDetail}>Search and discover Media opportunities</h2>
                    </div>
                    <div>
                    <div className={styles.formGroup}>
                        {loading ? <Loading color='#1551AB' width='7rem' height='2.5rem' /> :
                        <div className={styles.optionsGroup}>
                            <div className={styles.options}>
                                <div className={styles.optionsLabel}>Category</div>
                                <Select 
                                 options={this.state.categories}
                                 value={this.state.selectedCategories}
                                 onChange={this.handleChangeCategory}
                                 isMulti components={animatedComponents} 
                                 closeMenuOnSelect={false} 
                                />
                            </div>
                            <div className={styles.options}>
                                <div className={styles.optionsLabel}>Media Type</div>
                                <Select 
                                options={this.state.mediaTypes}
                                value={this.state.selectedMediaTypes}
                                onChange={this.handleChangeMediaType} 
                                isMulti components={animatedComponents} 
                                closeMenuOnSelect={false} 
                                />
                            </div>
                            <div className={styles.options}>
                                <div className={styles.optionsLabel}>Frequency</div>
                                <Select
                                 options={this.state.frequencies}
                                 value={this.state.selectedFrequencies}
                                 onChange={this.handleChangeFrequency} 
                                 isMulti components={animatedComponents} 
                                 closeMenuOnSelect={false} 
                                />
                            </div>
                            <div className={styles.options}>
                                <div className={styles.optionsLabel}>Country</div>
                                <Select
                                 options={this.state.countries} 
                                 value={this.state.selectedCountries}
                                 onChange={this.handleChangeCountry}
                                 isMulti components={animatedComponents} 
                                 closeMenuOnSelect={false} 
                                />
                            </div>
                        </div>}
                        {!loading && this.renderButton()}
                        </div>
                        
            </div>
            {searchLoading ? 
                          <div style={{color: '#1551AB', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center'}}>
                            <Loading color='#1551AB' width='7rem' height='2.5rem' />
                            Discovering...
                          </div> :
                          <section className={styles.tableSection}>
                {this.state.mediaOpportunities.length !== 0 ? <div>
                  <div className={styles.tableArea}>
                     <div className={styles.discover}>We Discovered {this.state.mediaOpportunities.length} Opportunities.</div>
                        <table id='media_opportunities' className={styles.tableDiv}>
                          <thead>
                            <tr>
                              <th>S/N</th>
                              <th>Media House</th>
                              <th>Programme Name</th>
                              <th>Description</th>
                              <th>Media Type</th>
                              <th>Category</th>
                              <th>Frequency</th>
                              <th>Contact</th>
                              {/* <th>Contact Email</th>
                              <th>Contact Number</th> */}
                            </tr>
                          </thead>
                            
              
                          <tbody>
                              {this.renderTableData()}
                          </tbody>
                        </table>
                  </div>
                  
                             
                  <div style={{color: '#1551AB', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center'}}>
                        <button className={styles.report} onClick={() => this.exportPDF()}>Export as PDF</button>
                  </div>
                              
                </div> : <Fragment />}
                            
                  {this.state.noResult !=='' ? <div>{this.state.noResult}
                    
                  </div>: <Fragment/>}
      
                </section>}
            
                </div>
        );
    }
}

const mapStateToProps = state => {
    const {userData} = state.auth

    return {userData}
}
export default connect(mapStateToProps)(Explore);