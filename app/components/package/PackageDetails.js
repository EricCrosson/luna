import { remote, ipcRenderer} from 'electron';
import React from 'react';
import Loader from '../../common/Loader';
import PackageActions from './PackageActions';
import PackageTabs from './PackageTabs';
import Actions from './actions';
import styles from './PackageDetails.css';

class PackageDetails extends React.Component {
  constructor(props) {
    super(props);
    this.doAction = this.doAction.bind(this);
    this.onChangeVersion = this.onChangeVersion.bind(this);
  }
  doAction(e) {
    e.preventDefault();

    let target = e.currentTarget;
    let action = target.querySelector('span').innerHTML.toLowerCase();

    //see actions.js e.g action = 'install'
    if(action && typeof action === 'string') {
      if(typeof Actions[action] === 'function') {
        let active = this.props.active;
        let selectVersion = this.refs.selectVersion;
        let version = (selectVersion && selectVersion.value !== "0") ? selectVersion.value : 'latest';
        Actions[action](active, version, () => {
          this.props.toggleMainLoader(true);
        });
      }
    }
    return false;
  }
  onChangeVersion(e) {
    let target = e.currentTarget;
    let pkg = this.props.active;
    let version = target.value;

    if (version !== "0") {
      this.props.toggleMainLoader(true);
      ipcRenderer.send('view-by-version', {
        pkgName: pkg.name,
        pkgVersion: version
      });
    }
    return false;
  }
  componentDidMount() {
    ipcRenderer.on('view-by-version-reply', (event, pkg) => {
      this.props.setActive(pkg, false);
    });

    ipcRenderer.on('update-package-close', (event, pkg) => {
      let selectVersion = this.refs.selectVersion;
      try {
        if(pkg && pkg.dependencies) {
          ipcRenderer.send('view-by-version', {
            pkgName: Object.keys(pkg.dependencies)[0],
            pkgVersion: (selectVersion && selectVersion.value !== "0") ? selectVersion.value : null,
            score: 'g'
          });
        }
      } catch (e) {
        console.error(e);
      }
    });
  }
  componentWillUnMount() {
    ipcRenderer.removeAllListeners('view-by-version-reply');
  }
  render() {
    let pkg = this.props.active;
    if (!pkg) {
      return null;
    }

    return (
      <div className={styles.package__details} ref="root">
        <div className={styles.package__details__head}>
          <div className={styles.package__details__title}>
            {pkg.name}&nbsp;
            <span className="label label-success">v{pkg.version}</span>
          </div>
          <div className={styles.package__details__actions}>
            <PackageActions packageActions={this.props.packageActions} doAction={this.doAction}/>
          </div>
        </div>
        <div className={styles.package__details__info}>
          <div className="form-group">
            <label htmlFor="selectVersion">
              <span>Select version</span>
            </label>
            <select onChange={this.onChangeVersion} className="form-control input-sm select-mini" ref="selectVersion">
              <option value="0">-</option>
              {pkg.versions.map((version, idx) => {
                return <option key={idx} value={version}>{version}</option>
              })}
            </select>
          </div>
          <div className={styles.package__details__date}></div>
        </div>
        <div className={styles.package__details__body}>
          <Loader loading={this.props.isLoading}>
            <PackageTabs pkg={pkg} />
          </Loader>
        </div>
      </div>
    )
  }
}

export default PackageDetails;
