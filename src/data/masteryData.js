// =============================================================
// masteryData.js — Mastery grid problems for the Roadmap
// =============================================================

const masteryData = [
  // 1. Linear Algebra
  { id: 'm1', cat: 'Linear Algebra', problem: 'Matrix-Vector Dot Product', url: 'https://numpy.org/doc/stable/reference/generated/numpy.dot.html', difficulty: 'beginner', progress: 0 },
  { id: 'm2', cat: 'Linear Algebra', problem: 'Transpose of a Matrix', url: 'https://www.geeksforgeeks.org/python-program-to-find-transpose-of-a-matrix/', difficulty: 'beginner', progress: 0 },
  { id: 'm3', cat: 'Linear Algebra', problem: 'Dot Product Calculator', url: 'https://www.mathsisfun.com/algebra/vectors-dot-product.html', difficulty: 'beginner', progress: 0 },
  { id: 'm4', cat: 'Linear Algebra', problem: 'Scalar Multiplication of a Matrix', url: 'https://www.geeksforgeeks.org/multiplication-two-matrices-single-line-using-numpy-python/', difficulty: 'beginner', progress: 0 },
  { id: 'm5', cat: 'Linear Algebra', problem: 'Calculate Cosine Similarity Between Vectors', url: 'https://www.geeksforgeeks.org/how-to-calculate-cosine-similarity-in-python/', difficulty: 'beginner', progress: 0 },
  { id: 'm6', cat: 'Linear Algebra', problem: 'Calculate Mean by Row or Column', url: 'https://numpy.org/doc/stable/reference/generated/numpy.mean.html', difficulty: 'beginner', progress: 0 },
  { id: 'm7', cat: 'Linear Algebra', problem: 'Calculate Eigenvalues of a Matrix', url: 'https://numpy.org/doc/stable/reference/generated/numpy.linalg.eig.html', difficulty: 'intermediate', progress: 0 },
  { id: 'm8', cat: 'Linear Algebra', problem: 'Calculate 2x2 Matrix Inverse', url: 'https://www.geeksforgeeks.org/how-to-inverse-a-matrix-using-numpy/', difficulty: 'intermediate', progress: 0 },
  { id: 'm9', cat: 'Linear Algebra', problem: 'Matrix times Matrix', url: 'https://www.geeksforgeeks.org/multiply-matrices-in-python/', difficulty: 'beginner', progress: 0 },

  // 2. Probability & Statistics
  { id: 'm10', cat: 'Probability & Statistics', problem: 'Poisson Distribution Probability Calculator', url: 'https://www.geeksforgeeks.org/poisson-distribution/', difficulty: 'intermediate', progress: 0 },
  { id: 'm11', cat: 'Probability & Statistics', problem: 'Binomial Distribution Probability', url: 'https://www.geeksforgeeks.org/python-binomial-distribution/', difficulty: 'intermediate', progress: 0 },
  { id: 'm12', cat: 'Probability & Statistics', problem: 'Normal Distribution PDF Calculator', url: 'https://www.geeksforgeeks.org/scipy-stats-norm-class-in-python/', difficulty: 'intermediate', progress: 0 },
  { id: 'm13', cat: 'Probability & Statistics', problem: 'Descriptive Statistics Calculator', url: 'https://www.geeksforgeeks.org/scipy-stats-describe-function-python/', difficulty: 'beginner', progress: 0 },
  { id: 'm14', cat: 'Probability & Statistics', problem: 'Calculate Covariance Matrix', url: 'https://numpy.org/doc/stable/reference/generated/numpy.cov.html', difficulty: 'intermediate', progress: 0 },

  // 3. Optimization Techniques
  { id: 'm15', cat: 'Optimization Techniques', problem: 'Linear Regression Using Gradient Descent', url: 'https://www.geeksforgeeks.org/gradient-descent-in-linear-regression/', difficulty: 'intermediate', progress: 0 },
  { id: 'm16', cat: 'Optimization Techniques', problem: 'Implement Gradient Descent Variants with MSE Loss', url: 'https://www.geeksforgeeks.org/ml-stochastic-gradient-descent-sgd/', difficulty: 'intermediate', progress: 0 },
  { id: 'm17', cat: 'Optimization Techniques', problem: 'Implement Adam Optimization Algorithm', url: 'https://www.geeksforgeeks.org/adam-optimizer/', difficulty: 'advanced', progress: 0 },
  { id: 'm18', cat: 'Optimization Techniques', problem: 'Implement Lasso Regression using ISTA', url: 'https://www.geeksforgeeks.org/implementation-of-lasso-regression-from-scratch-using-python/', difficulty: 'advanced', progress: 0 },

  // 4. Model Evaluation
  { id: 'm19', cat: 'Model Evaluation', problem: 'Generate a Confusion Matrix for Binary Classification', url: 'https://www.geeksforgeeks.org/confusion-matrix-machine-learning/', difficulty: 'beginner', progress: 0 },
  { id: 'm20', cat: 'Model Evaluation', problem: 'Calculate Accuracy Score', url: 'https://scikit-learn.org/stable/modules/generated/sklearn.metrics.accuracy_score.html', difficulty: 'beginner', progress: 0 },
  { id: 'm21', cat: 'Model Evaluation', problem: 'Implement Precision Metric', url: 'https://scikit-learn.org/stable/modules/generated/sklearn.metrics.precision_score.html', difficulty: 'beginner', progress: 0 },
  { id: 'm22', cat: 'Model Evaluation', problem: 'Implement Recall Metric in Binary Classification', url: 'https://scikit-learn.org/stable/modules/generated/sklearn.metrics.recall_score.html', difficulty: 'beginner', progress: 0 },
  { id: 'm23', cat: 'Model Evaluation', problem: 'Implement F-Score Calculation for Binary Classification', url: 'https://scikit-learn.org/stable/modules/generated/sklearn.metrics.f1_score.html', difficulty: 'beginner', progress: 0 },
  { id: 'm24', cat: 'Model Evaluation', problem: 'Calculate R-squared for Regression Analysis', url: 'https://www.geeksforgeeks.org/python-r-squared-value-for-regression/', difficulty: 'intermediate', progress: 0 },
  { id: 'm25', cat: 'Model Evaluation', problem: 'Calculate Mean Absolute Error (MAE)', url: 'https://www.geeksforgeeks.org/how-to-calculate-mean-absolute-error-in-python/', difficulty: 'beginner', progress: 0 },
  { id: 'm26', cat: 'Model Evaluation', problem: 'Calculate Root Mean Square Error (RMSE)', url: 'https://www.geeksforgeeks.org/root-mean-square-error-in-r-programming/', difficulty: 'beginner', progress: 0 },
  { id: 'm27', cat: 'Model Evaluation', problem: 'Implement K-Fold Cross-Validation', url: 'https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.KFold.html', difficulty: 'intermediate', progress: 0 },
  { id: 'm28', cat: 'Model Evaluation', problem: 'Calculate Performance Metrics for a Classification Model', url: 'https://scikit-learn.org/stable/modules/model_evaluation.html', difficulty: 'intermediate', progress: 0 },
  { id: 'm29', cat: 'Model Evaluation', problem: 'Implementation of Log Softmax Function', url: 'https://pytorch.org/docs/stable/generated/torch.nn.LogSoftmax.html', difficulty: 'intermediate', progress: 0 },
  { id: 'm30', cat: 'Model Evaluation', problem: 'Implement ReLU Activation Function', url: 'https://www.geeksforgeeks.org/relu-activation-function-in-deep-learning/', difficulty: 'beginner', progress: 0 },

  // 5. Classification & Regression
  { id: 'm31', cat: 'Classification & Regression', problem: 'Linear Regression Using Normal Equation', url: 'https://www.geeksforgeeks.org/ml-normal-equation-in-linear-regression/', difficulty: 'intermediate', progress: 0 },
  { id: 'm32', cat: 'Classification & Regression', problem: 'Linear Regression Using Gradient Descent', url: 'https://www.geeksforgeeks.org/gradient-descent-in-linear-regression/', difficulty: 'intermediate', progress: 0 },
  { id: 'm33', cat: 'Classification & Regression', problem: 'Binary Classification with Logistic Regression', url: 'https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LogisticRegression.html', difficulty: 'intermediate', progress: 0 },
  { id: 'm34', cat: 'Classification & Regression', problem: 'Calculate Jaccard Index for Binary Classification', url: 'https://www.geeksforgeeks.org/ml-jaccard-similarity-and-jaccard-distance/', difficulty: 'beginner', progress: 0 },
  { id: 'm35', cat: 'Classification & Regression', problem: 'Pegasos Kernel SVM Implementation', url: 'https://www.geeksforgeeks.org/support-vector-machine-algorithm/', difficulty: 'advanced', progress: 0 },
  { id: 'm36', cat: 'Classification & Regression', problem: 'Implement AdaBoost Fit Method', url: 'https://www.geeksforgeeks.org/implementing-the-adaboost-algorithm-from-scratch/', difficulty: 'advanced', progress: 0 },
  { id: 'm37', cat: 'Classification & Regression', problem: 'Softmax Activation Function Implementation', url: 'https://www.geeksforgeeks.org/softmax-regression-using-tensorflow/', difficulty: 'intermediate', progress: 0 },

  // 6. Unsupervised Learning
  { id: 'm38', cat: 'Unsupervised Learning', problem: 'KL Divergence Between Two Normal Distributions', url: 'https://www.geeksforgeeks.org/kullback-leibler-divergence/', difficulty: 'advanced', progress: 0 },
  { id: 'm39', cat: 'Unsupervised Learning', problem: 'Principal Component Analysis (PCA) Implementation', url: 'https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.PCA.html', difficulty: 'advanced', progress: 0 },
  { id: 'm40', cat: 'Unsupervised Learning', problem: 'K-Means Clustering', url: 'https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html', difficulty: 'intermediate', progress: 0 },

  // 7. Deep Learning
  { id: 'm41', cat: 'Deep Learning', problem: 'Single Neuron', url: 'https://www.geeksforgeeks.org/single-layer-perceptron-in-tensorflow/', difficulty: 'beginner', progress: 0 },
  { id: 'm42', cat: 'Deep Learning', problem: 'Sigmoid Activation Function Understanding', url: 'https://www.geeksforgeeks.org/implement-sigmoid-function-using-numpy/', difficulty: 'beginner', progress: 0 },
  { id: 'm43', cat: 'Deep Learning', problem: 'Softmax Activation Function Implementation', url: 'https://www.geeksforgeeks.org/softmax-regression-using-tensorflow/', difficulty: 'intermediate', progress: 0 },
  { id: 'm44', cat: 'Deep Learning', problem: 'Implementation of Log Softmax Function', url: 'https://pytorch.org/docs/stable/generated/torch.nn.LogSoftmax.html', difficulty: 'intermediate', progress: 0 },
  { id: 'm45', cat: 'Deep Learning', problem: 'Implement ReLU Activation Function', url: 'https://www.geeksforgeeks.org/relu-activation-function-in-deep-learning/', difficulty: 'beginner', progress: 0 },
  { id: 'm46', cat: 'Deep Learning', problem: 'Simple Convolutional 2D Layer', url: 'https://pytorch.org/docs/stable/generated/torch.nn.Conv2d.html', difficulty: 'advanced', progress: 0 },
  { id: 'm47', cat: 'Deep Learning', problem: 'Implementing a Simple RNN', url: 'https://www.geeksforgeeks.org/recurrent-neural-networks-explanation/', difficulty: 'advanced', progress: 0 },
];

export default masteryData;
