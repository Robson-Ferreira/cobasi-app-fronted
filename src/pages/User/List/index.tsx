import React from 'react';
import { Api } from '../../../services';
import { useNavigate } from 'react-router-dom';
import { 
	Table,
	Divider,
	Button,
	Tag,
	Row,
	Col,
	Input,
	message,
	TablePaginationConfig
} from 'antd';

import '../styles.css';

const ListUsers: React.FC = () => {
	const navigate = useNavigate();
	const [data, setData] = React.useState([]);
	const [loading, setLocading] = React.useState(true);
	const [pagination, setPagination]: any = React.useState({
		current: 1,
		pageSize: 5,
	});

	React.useEffect(() => {
		loadData(pagination);
	}, []);

	const loadData = async (params: any = {}) => {
		try {
			const { data } = await Api.get('/users', { params });
			setPagination({
				...params,
				total: data.total,
			});
			setData(data.data);
			setLocading(false);
		} catch (error: any) {
			message.error(error.message);
		}
	}

	const columns = [
		{
			title: '#ID',
			key: '_id',
			dataIndex: '_id',
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			render: (name: string) => <Tag color={"geekblue"}>{name}</Tag>,
		},
		{
			title: 'E-mail Address',
			key: 'email',
			dataIndex: 'email',
			render: (email: string) => <a href={`mailto:${email}`}>{email}</a>,
		},
		{
			title: 'Phone',
			key: 'phone',
			dataIndex: 'phone',
		},
	];

	const handleTableChange = async (newPagination: TablePaginationConfig) => {
		return loadData(newPagination);
	};

	return (
		<div className="container">
			<Row>
					<Col span={8}>
						<Input
								placeholder='Search by name or e-mail'
								size='large'
								style={{ borderRadius: 5 }}
								onChange={(e) => {
									loadData({
										...{ current: 1, page: 5, total: 0 },
										...{ search: e.target.value },
									});
								}}
						/>
					</Col>
					<Col span={8} offset={8}>
						<Button
							type="dashed" 
							shape="round"
							size="large"
							onClick={() => navigate('/users/create')}
							style={{ width: '100%' }}
						>
							Create User
						</Button>
					</Col>
			</Row>
				
			<Divider />

			<Table
				columns={columns}
				dataSource={data}
				pagination={pagination}
				onChange={handleTableChange}
				loading={loading}
				rowKey="_id"
				size="large"
			/>
		</div>
	);
}

export default ListUsers;